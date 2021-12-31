const express = require("express");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient();

const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://mspiewak:${process.env.DB_PASS_PASSWORD}@cluster0.rczr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

var bodyParser = require("body-parser");
const User = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    store: new RedisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
    }),
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/", (req, res) => {
  if (req.session.key) {
    res.redirect("/home");
  } else {
    res.json({ message: "brak sesji" });
  }
});

app.post("/", async (req, res) => {
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
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server runs on port ${process.env.DB_PASS_PASSWORD}`);
});
