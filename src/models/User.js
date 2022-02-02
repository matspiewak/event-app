const mongoose = require("mongoose");
const { Schema } = mongoose;
const validate = require("validator");

const userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  email: {
    type: String,
    required: true,
    validate: [validate.isEmail, "not email"],
  },
  password: {
    type: String,
    required: true,
    min: [8, "Must be at least 8, got {VALUE}"],
  },
  name: {
    type: String,
    required: true,
  },
  organization: {
    isOrganiser: {
      type: Boolean,
      required: true,
      default: false,
    },
    orgDetails: {
      name: String,
      website: String,
    },
  },
  lastName: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: false,
    min: "1900-01-01",
    max: Date.now(),
    validate: [validate.isDate, "incorrect date"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  following: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", userSchema);
