const express = require('express');

const Parking = require('../models/parking');
const User = require('../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const parkingRouter = new express.Router();

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

parkingRouter.get('/list', (request, response, next) => {
  const { city, time, day } = request.body;
  Parking.find()
    .populate('user')
    .then(spots => {
      response.json({ spots });
    })
    .catch(error => {
      next(error);
    });
});

parkingRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const spot = await Parking.findById(id).populate('user');
    if (spot) {
      response.json({ spot });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

parkingRouter.post('/create', (req, res, next) => {
  // let url;
  // if (request.file) {
  //   url = request.file.path;
  // }
  const { location, description, price } = req.body;
  const id = req.user._id;
  Parking.create({
    location: location,
    description: description,
    price: price,
    user: req.user._id
  })
    .then(parking => {
      return User.findByIdAndUpdate(id, {
        $push: { parkings: parking._id }
      });
    })
    .then(document => {
      res.json(document);
    })
    .catch(error => {
      next(error);
    });
});

parkingRouter.delete('/:id', routeAuthenticationGuard, async (request, response, next) => {
  const id = request.params.id;
  const userId = request.user._id;

  User.findByIdAndUpdate({ _id: userId }, { $pull: { parkings: id } }, { safe: true, upsert: true }).then(() => {
    Parking.findOneAndDelete({ _id: id, user: request.user._id })
      .then(() => {
        response.json({});
      })
      .catch(error => {
        console.log(error);
        next(error);
      });
  });
});

parkingRouter.patch('/:id', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  const { location, description, price } = request.body;
  const data = { location, description, price };

  Parking.findByIdAndUpdate(id, data)
    .then(spot => {
      response.json({ spot });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = parkingRouter;
