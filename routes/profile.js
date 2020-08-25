// PROFILE

const express = require('express');
const User = require('./../models/user');
const Parking = require('./../models/parking');
const Rental = require('./../models/rental');
const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const profileRouter = new express.Router();

// profileRouter.get('/profile', routeAuthenticationGuard, (request, response, next) => {
//   const userId = request.user._id;

//   Parking.find({ user: userId })
//     .populate('user')
//     .then(parking => {
//       response.json({ parking });
//     })
//     .catch(error => {
//       next(error);
//     });
// });

profileRouter.get('/profile', routeAuthenticationGuard, (request, response, next) => {
  const userId = request.user._id;
  let parking = [];
  let rental = [];

  User.find({ _id: userId })
    .then(() => {
      return Parking.find({ user: userId })
        .populate('user')
        .then(parkingData => {
          parking = parkingData;
          // console.log(parking);
        })
        .catch(error => {
          next(error);
        });
    })
    .then(() => {
      return Rental.find({ renter: userId })
        .populate('parking')
        .populate('owner')
        .populate('renter')
        .then(rentalData => {
          rental = rentalData;
          // console.log(rental);
        });
    })
    .then(() => {
      const document = { parking, rental };
      response.json({ document });
    })
    .catch(error => {
      next(error);
    });
});

profileRouter.patch('/profile/edit', routeAuthenticationGuard, (request, response, next) => {
  const id = request.user.id;
  const { name, email } = request.body;
  const data = { id, name, email };

  console.log(request.body);
  console.log(request.user);

  User.findByIdAndUpdate(id, data)
    .then(user => {
      response.json({ user });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
