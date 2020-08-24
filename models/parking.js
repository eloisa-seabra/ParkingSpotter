const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      minLenth: 6,
    },
    coordinates: [{ type: Number, max: 180, min: -180 }],
    description: {
      type: String,
      minLenth: 6,
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
