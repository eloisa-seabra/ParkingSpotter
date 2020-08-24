const express = require('express');

const Rental = require('../models/rental');
const Parking = require('../models/parking');
const User = require('../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const rentalRouter = new express.Router();

rentalRouter.post('/rental', (request, response, next) => {
  console.log(request.data);
  //const body = request.body;

  const { parkingId, ownerId, renterId } = request.data;

  Rental.create({
    parking: parkingId,
    owner: ownerId,
    renter: renterId
  }).then(document => {
    response.json({ document });
  });
});

module.exports = rentalRouter;
