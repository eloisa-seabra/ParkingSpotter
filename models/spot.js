const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      minLenth: 6
    },
    description: {
      type: String,
      required: true,
      minLenth: 6
    },
    photo: {
      type: String,
      default: ''
    },
    location: {
      type: {
        type: String,
        default: 'point'
      },
      coordinates: [
        {
          lon: {
            type: Number,
            max: 180,
            min: -180
          }
        },
        {
          lat: {
            type: Number,
            max: 180,
            min: -180
          }
        }
      ]
    },
    availability: {
      type: new Date()
    },
    isRented: {
      type: Boolean,
      default: false
    },
    hourlyPrice: {
      type: Number
    },
    //dailyPrice: {
    //  type: Number
    //},
    user: {
      type: mongoose.types.id,
      ref: 'User'
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model('Spot', schema);
