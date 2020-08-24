// PROFILE

const express = require("express");
const User = require("./../models/user");
const routeAuthenticationGuard = require("./../middleware/route-authentication-guard");

const profileRouter = new express.Router();

profileRouter.get("/profile", routeAuthenticationGuard, (request, response) => {
  // const user = request.user;
  const userId = request.user._id;
  console.log(request.user);
  User.find({ _id: userId })
    .populate("parkings")
    .then((user) => {
      return user[0];
    })
    .then((user) => {
      response.json({ user });
    });
});

profileRouter.patch("/profile/edit", routeAuthenticationGuard, (request, response, next) => {
  const id = request.user.id;
  const { name, email } = request.body;
  const data = { name, email };

  console.log(request.body);
  console.log(request.user);

  User.findByIdAndUpdate(id, data)
    .then((user) => {
      response.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = profileRouter;
