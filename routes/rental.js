const express = require('express');

const Rental = require('../models/rental');
const Parking = require('../models/parking');
const User = require('../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const rentalRouter = new express.Router();

rentalRouter.post('/rental', routeAuthenticationGuard, (request, response, next) => {
  const { parkingId, ownerId, renterId, parkingPrice } = request.body;

  Rental.create({
    parking: parkingId,
    owner: ownerId,
    renter: renterId,
    price: parkingPrice,
    status: 'rented'
  })
    .then(document => {
      response.json({ document });
    })
    .then(() => {
      // const id = document.req.body.parkingId;
      // console.log(id);
      console.log(parkingId);
      Parking.findOneAndUpdate({ _id: parkingId }, { isRented: true }, { upsert: true }).then(data => {
        console.log(data);
      });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = rentalRouter;
