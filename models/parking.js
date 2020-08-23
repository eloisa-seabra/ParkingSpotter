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
    price: {
      type: Number
    },

    isRented: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
<<<<<<< HEAD
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
=======
    }
>>>>>>> 65029b5004ec7d63e48879e537fd0a0b7f8985a9
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model('Parking', schema);
