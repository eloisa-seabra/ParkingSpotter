const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      minLenth: 6,
    },
    lng: {
      type: Number,
      max: 180,
      min: -180,
    },
    lat: {
      type: Number,
      max: 90,
      min: -90,
    },
    description: {
      type: String,
      max: 180,
      min: -180,
    },
    photo: {
      type: String,
    },
    // availability: {
    //   type: Date,
    // },
    price: {
      type: Number,
    },
    isRented: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Parking", schema);
