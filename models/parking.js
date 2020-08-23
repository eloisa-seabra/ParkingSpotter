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
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model('Parking', schema);
