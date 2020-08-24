// PROFILE

const express = require('express');
const User = require('./../models/user');
const Parking = require('./../models/parking');
const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const profileRouter = new express.Router();

profileRouter.get('/profile', routeAuthenticationGuard, (request, response, next) => {
  const userId = request.user._id;

  Parking.find({ user: userId })
    .populate('user')
    .then(parking => {
      response.json({ parking });
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
