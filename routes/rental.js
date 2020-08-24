const express = require('express');

const Rental = require('../models/rental');
const Parking = require('../models/parking');
const User = require('../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const rentalRouter = new express.Router();

rentalRouter.post('/rental', (request, response, next) => {
  console.log(request.body);
  const body = request.body;

  // const { }
  // Rental.create({

  // })
  response.json({ type: 'success' });

  // Rental.create({});
});

module.exports = rentalRouter;
