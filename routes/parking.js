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
  const coordinates = request.query.coordinates;
  const stringLng = coordinates[0];
  const lng = Number(stringLng);
  const stringLat = coordinates[1];
  const lat = Number(stringLat);
  const maxLng = lng + 0.1;
  const minLng = lng - 0.1;
  const maxLat = lat + 0.1;
  const minLat = lat - 0.1;
  Parking.find({
    lng: { $gt: minLng, $lt: maxLng },
    lat: { $gt: minLat, $lt: maxLat }
  })
    .find({ isRented: false })
    .populate('user')
    .then(spots => {
      response.json({ spots });
    })
    .catch(error => {
      console.log(error);
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

parkingRouter.post('/create', upload.single('photo'), (req, res, next) => {
  let url;
  if (req.file) {
    url = req.file.path;
  }
  const { location, description, price, lat, lng } = req.body;
  const numLat = Number(lat);
  const numLng = Number(lng);
  Parking.create({
    location,
    description,
    lng: numLng,
    lat: numLat,
    price,
    user: req.session.userId,
    photo: url
  })
    .then(document => {
      res.json({ document });
    })
    .catch(error => {
      console.log(error);
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
        console.log(error);
        next(error);
      });
  }
);

parkingRouter.patch(
  '/:id',
  routeAuthenticationGuard,
  upload.single('photo'),
  (request, response, next) => {
    const id = request.params.id;
    const { location, description, lat, lng, price, oldPhoto } = request.body;

    let data;
    let photo;

    if (!request.file) {
      photo = oldPhoto;
      data = { location, description, lat, lng, price, photo };
    } else {
      photo = request.file.path;
      data = { location, description, lat, lng, price, photo };
    }

    console.log('body', request.body);
    console.log('data', data);

    Parking.findByIdAndUpdate(id, data)
      .then(spot => {
        response.json({ spot });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = parkingRouter;
