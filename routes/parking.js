const express = require("express");

<<<<<<< HEAD
const Parking = require("../models/parking");
=======
const Parking = require('../models/parking');
const User = require('../models/user');
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331

const routeAuthenticationGuard = require("./../middleware/route-authentication-guard");

const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorageCloudinary = require("multer-storage-cloudinary");

const parkingRouter = new express.Router();

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
});
const upload = multer({ storage });

parkingRouter.get("/list", (request, response, next) => {
  const { city, time, day } = request.body;
  Parking.find()
    .populate("user")
    .then((spots) => {
      response.json({ spots });
    })
    .catch((error) => {
      next(error);
    });
});

parkingRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const spot = await Parking.findById(id).populate("user");
    if (spot) {
      response.json({ spot });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

parkingRouter.post("/create", (req, res, next) => {
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
    user: req.user._id,
  })
<<<<<<< HEAD
    .then((document) => {
      res.json(document);
=======
    .then(parking => {
      return User.findByIdAndUpdate(id, {
        $push: { parkings: parking._id }
      });
    })
    .then(spot => {
      res.json({ spot });
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331
    })
    .catch((error) => {
      next(error);
    });
});

<<<<<<< HEAD
parkingRouter.delete("/:id", routeAuthenticationGuard, async (request, response, next) => {
=======
parkingRouter.delete('/:id', routeAuthenticationGuard, async (request, response, next) => {
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331
  const id = request.params.id;

  Parking.findOneAndDelete({ _id: id, user: request.user._id })
    .then(() => {
      response.json({});
    })
<<<<<<< HEAD
    .catch((error) => {
=======
    .catch(error => {
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331
      next(error);
    });
});

<<<<<<< HEAD
parkingRouter.patch("/:id", routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;

  Parking.findOneAndUpdate(
    { _id: id, user: request.user._id },
    { description: request.body.description },
    { price: request.body.price },
    { new: true }
  )
    .then((spot) => {
      response.json({ spot });
    })
    .catch((error) => {
=======
parkingRouter.patch('/:id', routeAuthenticationGuard, (request, response, next) => {
  const id = request.params.id;
  const { location, description, price } = request.body;
  const data = { location, description, price };

  Parking.findByIdAndUpdate(id, data)
    .then(spot => {
      response.json({ spot });
    })
    .catch(error => {
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331
      next(error);
    });
});

module.exports = parkingRouter;
