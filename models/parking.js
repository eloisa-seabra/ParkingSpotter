const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      minLenth: 6
    },
    description: {
      type: String,
      required: true,
      minLenth: 6
    },
    // photo: {
    //   type: String,
    //   required: true,
    // },
    // availability: {
    //   type: Date,
    // },
<<<<<<< HEAD
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
=======
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
>>>>>>> 98559d69cf6c2d36aaa4b79a47def38326c1d1fb
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model('Parking', schema);
