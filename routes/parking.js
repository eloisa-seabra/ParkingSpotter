const express = require('express');

const Parking = require('../models/parking');

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
  const { address, description, hourlyPrice } = req.body;
  Parking.create({
    address: address,
    description: description,
    hourlyPrice: hourlyPrice
  })
    .then(spot => {
      res.json({ spot });
    })
    .catch(error => {
      next(error);
    });
});

parkingRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (request, response, next) => {
    const id = request.params.id;

    Parking.findOneAndDelete({ _id: id, user: request.user._id })
      .then(() => {
        response.json({});
      })
      .catch(error => {
        next(error);
      });
  }
);

parkingRouter.patch(
  '/:id',
  routeAuthenticationGuard,
  (request, response, next) => {
    const id = request.params.id;

    Parking.findOneAndUpdate(
      { _id: id, user: request.user._id },
      { description: request.body.description },
      { new: true }
    )
      .then(spot => {
        response.json({ spot });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = parkingRouter;
