const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
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

//* generates cookie

exports.signIn = async (req, res, next) => {
  const session = req.session;
  passport.authenticate("signin", async (err, user, info) => {
    try {
      if (!user) {
        return res.status(404).json(info);
      }
      req.login(user, { session: false }, () => {
        session.userId = user._id;
        session.organization = user.organization;
        console.log(session);
        res.status(200).json(info);
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  })(req, res, next);
};
