const express = require("express");

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
      console.log(parkingId);
      Parking.findOneAndUpdate({ _id: parkingId }, { isRented: true }, { upsert: true }).then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

rentalRouter.post("/rental/payment", routeAuthenticationGuard, (req, res) => {
  console.log("getting to backend", req.body);
  res.json({});
});

rentalRouter.patch("/rental/:id", routeAuthenticationGuard, (request, response) => {
  const id = request.params.id;
  let rental = request.body.rental;
  let parking = request.body.rental.parking;

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
    Parking.findOneAndUpdate({ _id: parkingId }, { isRented: false }).then((spot) => {
      parking = spot;
      const body = { parking, rental };
      response.json({ body });
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
      console.log(rentals);
      response.json({ rentals });
    });
});

module.exports = rentalRouter;
