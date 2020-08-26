const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parking',
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['rented', 'ended'],
      required: true
    },
    duration: {
      hours: Number,
      minutes: Number
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: 'startedAt',
      updatedAt: 'endedAt'
    }
  }
);

module.exports = mongoose.model('Rental', schema);
