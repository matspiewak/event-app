const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  address: {
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    streetNumber: {
        type: Number,
        required: true
    },
    postalCode: { //? Cant really validate because of postal code differences in different countries
        type: String,
        required: true
    }
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  tags: [{ type: String }],
});

module.exports = mongoose.model("Venue", placeSchema);
