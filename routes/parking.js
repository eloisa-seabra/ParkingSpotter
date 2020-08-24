const express = require("express");

const Parking = require("../models/parking");
const User = require("../models/user");

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

parkingRouter.post("/create", upload.single("photo"), (req, res, next) => {
  console.log(req.body);
  let url;
  if (req.file) {
    url = req.file.path;
  }
  const { location, description, price, coordinates } = req.body;
  const userId = req.user._id;
  //let document;
  Parking.create({
    location,
    description,
    coordinates,
    price,
    user: req.user._id,
    photo: url,
  })
    // .then((parking) => {
    //   document = parking;
    //   return User.findByIdAndUpdate(userId, {
    //     $push: { parkings: parking._id },
    //   });
    // })
    .then((document) => {
      console.log("response");
      res.json({ document });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

parkingRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (request, response, next) => {
    const id = request.params.id;
    const userId = request.user._id;

    User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { parkings: id } },
      { safe: true, upsert: true }
    ).then(() => {
      Parking.findOneAndDelete({ _id: id, user: request.user._id })
        .then(() => {
          response.json({});
        })
        .catch(error => {
          console.log(error);
          next(error);
        });
    });
  }
);

parkingRouter.patch(
  '/:id',
  routeAuthenticationGuard,
  upload.single('photo'),
  (request, response, next) => {
    const id = request.params.id;
    const { location, description, price } = request.body;
    let data;

parkingRouter.patch("/:id", routeAuthenticationGuard, upload.single("photo"), (request, response, next) => {
  const id = request.params.id;
  const { location, description, price } = request.body;
  let data;

  if (request.file) {
    const photo = request.file.path;
    data = { location, description, price, photo };
  } else {
    data = { location, description, price };
  }

  Parking.findByIdAndUpdate(id, data)
    .then((spot) => {
      response.json({ spot });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = parkingRouter;