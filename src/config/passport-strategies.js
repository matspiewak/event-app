const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user, { message: "Logged in Successfully" });
        } else {
          return done(null, false, { message: "Wrong Password" });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
