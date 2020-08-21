const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    confirmationToken: {
      type: String,
    },
    confirmedStatus: {
      type: Boolean,
      default: false,
    },
    stripeToken: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", schema);
