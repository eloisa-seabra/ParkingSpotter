const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');
// const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const authenticationRouter = new express.Router();

authenticationRouter.post('/sign-up', async (request, response, next) => {
  const { name, email, password } = request.body;
  try {
    if (password.length < 6) throw new Error('Password is too short.');
    const hashAndSalt = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHashAndSalt: hashAndSalt
    });
    request.session.userId = user._id;
    response.json({
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-in', async (request, response, next) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('No user with that email.');
    const passwordHashAndSalt = user.passwordHashAndSalt;
    const comparison = await bcrypt.compare(password, passwordHashAndSalt);
    if (!comparison) throw new Error('Password did not match.');
    request.session.userId = user._id;
    response.json({
      user: { name: user.name, email: user.email, _id: user._id }
    });
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-out', (request, response) => {
  request.session.destroy();
  response.json({});
});

authenticationRouter.get('/me', (request, response) => {
  const user = request.user;
  response.json({ user });
});

module.exports = authenticationRouter;
