const mongoose = require("mongoose");
const User = require("../models/User");

exports.signUp = async (req, res) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password,
    });
    await user
      .save()
      .then((docs) => {
        res.status(200).json({
          info: docs,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };

//   exports.signIn = async (req, res) => {
//       User.f
//   }
  