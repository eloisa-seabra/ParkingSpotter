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

rentalRouter.patch('/rental/:id', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  console.log('id', id);

  Rental.findOneAndUpdate({ _id: id }, { status: 'ended' }).then(renting => {
    console.log(renting);
    const parkingId = renting.parking._id;
    console.log('renting', renting);
    console.log('parkingId', parkingId);
    Parking.findOneAndUpdate({ _id: parkingId }, { isRented: false }).then(parking => {
      console.log(parking);
      response.json({ parking });
    });
  });
});

module.exports = rentalRouter;
