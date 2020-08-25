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
    start: {
      type: Date
      // required: true
    },
    end: {
      type: Date
      // required: true
    }
  },
  {
    timestamps: {
      createdAt: 'startedAt',
      updatedAt: 'changedAt'
    }
  }
);

module.exports = mongoose.model('Rental', schema);
