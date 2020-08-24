const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
      minlength: 3,
      maxlength: 200
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHashAndSalt: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 6
    },
    parkings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parking' }],
    status: {
      type: String,
      enum: ['pending_confirmation', 'active'],
      default: 'pending_confirmation'
    },
    confirmationToken: {
      type: String
    },
    stripeToken: {
      type: String
    }
  },
  {
    timeStamps: true
  }
);

module.exports = mongoose.model('User', schema);
