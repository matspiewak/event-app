const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  startingDate: {},
  endingDate: {},
  ageRestriction: {},
  ticketsLeft: {},
  eventWebsite: {},
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
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
