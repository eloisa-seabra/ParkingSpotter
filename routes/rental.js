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
    price: parkingPrice
  })
    .then(document => {
      response.json({ document });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = rentalRouter;
