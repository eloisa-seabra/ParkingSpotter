const express = require('express');

const Parking = require('../models/parking');
<<<<<<< HEAD
const User = require('../models/user');
=======
>>>>>>> 65029b5004ec7d63e48879e537fd0a0b7f8985a9

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
<<<<<<< HEAD
    .then(parking => {
      return User.findByIdAndUpdate(id, {
        $push: { parkings: parking._id }
      });
    })
=======
>>>>>>> 65029b5004ec7d63e48879e537fd0a0b7f8985a9
    .then(spot => {
      res.json({ spot });
    })
    .catch(error => {
      next(error);
    });
});

<<<<<<< HEAD
parkingRouter.delete('/:id', routeAuthenticationGuard, async (request, response, next) => {
  const id = request.params.id;

  Parking.findOneAndDelete({ _id: id, user: request.user._id })
    .then(() => {
      response.json({});
    })
    .catch(error => {
      next(error);
    });
});

parkingRouter.patch('/:id', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;

  Parking.findOneAndUpdate({ _id: id, user: request.user._id }, { description: request.body.description }, { new: true })
    .then(spot => {
      response.json({ spot });
    })
    .catch(error => {
      next(error);
    });
});
=======
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
      { price: request.body.price },
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
>>>>>>> 65029b5004ec7d63e48879e537fd0a0b7f8985a9

module.exports = parkingRouter;
