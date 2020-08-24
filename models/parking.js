const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      minLenth: 6,
    },
    coordinates: [
      {
        type: Number,
        max: 180,
        min: -180,
      },
    ],
    description: {
      type: String,
      required: true,
      minLenth: 6,
    },
    // photo: {
    //   type: String,
    //   required: true,
    // },
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
<<<<<<< HEAD
      ref: "User",
    },
=======
      ref: 'User'
    },
    hourlyPrice: {
      type: Number
    }
    //dailyPrice: {
    //  type: Number
    //},
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
>>>>>>> 147716a38e79d593e9dc6cd0539050df94168331
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Parking", schema);
