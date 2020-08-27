const express = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Rental = require("../models/rental");
const Parking = require("../models/parking");

const routeAuthenticationGuard = require("./../middleware/route-authentication-guard");

const rentalRouter = new express.Router();

rentalRouter.post("/rental", routeAuthenticationGuard, (request, response, next) => {
  const { parkingId, ownerId, renterId, parkingPrice } = request.body;

  Rental.create({
    parking: parkingId,
    owner: ownerId,
    renter: renterId,
    price: parkingPrice,
    status: "rented",
  })
    .then((document) => {
      response.json({ document });
    })
    .then(() => {
      Parking.findOneAndUpdate({ _id: parkingId }, { isRented: true }, { upsert: true });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

rentalRouter.patch("/rental/:id", routeAuthenticationGuard, (request, response) => {
  const id = request.params.id;
  let rental = request.body.rental;
  let parking = request.body.rental.parking;
  let body;

  const rentalTime = (time) => {
    const startingTime = Date.parse(time);
    const nowTime = Date.now();

    const durationTimeUnix = nowTime - startingTime;
    const hours = durationTimeUnix / 1000 / 60 / 60;
    const totalMinutes = durationTimeUnix / 1000 / 60;
    const hoursAmount = Math.floor(durationTimeUnix / 1000 / 60 / 60);
    const minutesAmount = Math.ceil((hours - hoursAmount) * 60);

    return { hours: hoursAmount, minutes: minutesAmount, totalMinutes };
  };

  const hours = rentalTime(rental.startedAt).hours;
  const minutes = rentalTime(rental.startedAt).minutes;
  const duration = { hours, minutes };

  const totalAmount =
    Math.round((rental.price / 4) * Math.ceil(rentalTime(rental.startedAt).totalMinutes / 15) * 100) / 100;

  Rental.findOneAndUpdate({ _id: id }, { status: "ended", duration, totalAmount }).then((renting) => {
    rental = renting;
    const parkingId = renting.parking._id;
    Parking.findOneAndUpdate({ _id: parkingId }, { isRented: false })
      .then((spot) => {
        parking = spot;
        body = { parking, rental };
        const payId = request.body.id;
        return Rental.findById(payId);
      })
      .then((payRental) => {
        const { token } = request.body;
        const amount = payRental.totalAmount * 100;
        return stripe.charges.create({
          amount: amount,
          currency: "eur",
          source: token,
          description: `Parking spot rental ${id}`,
        });
      })
      .then((charge) => {
        response.json({ body });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

rentalRouter.get("/rental", (request, response) => {
  const userId = request.user._id;

  Rental.find({ renter: userId })
    .populate("parking")
    .populate("owner")
    .populate("renter")
    .then((rentals) => {
      response.json({ rentals });
    });
});

module.exports = rentalRouter;
