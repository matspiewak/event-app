const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  ageRestriction: {
    isAgeRestricted: {
      type: Boolean,
      required: true,
      default: false,
    },
    ageRestrictionValue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  ticketsLeft: {
    type: Number,
    required: true,
    default: Number.MAX_VALUE,
  },
  eventWebsite: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: "Place",
  },
  isActive: {
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

module.exports = mongoose.model("Event", eventSchema);