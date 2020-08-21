const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');

const deserializeUser = require('./middleware/deserialize-user');

const authenticationRouter = require('./routes/authentication');
<<<<<<< HEAD
const profileRouter = require('./routes/profile');

=======
const parkingRouter = require('./routes/parking');
>>>>>>> fce9e3444ce52a329023adbc6ccd3a3236e2f19d
const mongoStore = connectMongo(expressSession);

const app = express();

app.set('trust proxy', 1);

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));

// Mount necessary middleware

app.use(
  cors({
    origin: [process.env.CLIENT_APP_URL],
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);
app.use(deserializeUser);

// Route Handlers

app.use('/authentication', authenticationRouter);
<<<<<<< HEAD
app.use('/', profileRouter);
=======
app.use('/parking', parkingRouter);
>>>>>>> fce9e3444ce52a329023adbc6ccd3a3236e2f19d

// If no route handler is matched above,
// this will run
app.use('*', (request, response, next) => {
  const error = new Error('Page not found.');
  next(error);
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
