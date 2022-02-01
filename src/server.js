const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./nodeConnection");
const session = require("express-session");
const redis = require("redis");
const passport = require("passport");

let Promise = require("bluebird");
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6380,
  auth_pass: process.env.REDIS_AUTH,
  tls: {
    servername: process.env.REDIS_HOST,
  },
});

const app = express();

redisClient.on("connect", async () => {
  console.log(
    "RedisClient connected successfully: " + (await redisClient.pingAsync())
  );
});
redisClient.on("error", async (err) => {
  console.log(`RedisError: ${await err}`);
});

dbConnection();

app.use(express.json());
const UserRouter = require("./routes/UserRouter");

app.use(
  session({
    secret: process.env.REDIS_SECRET,
    store: new RedisStore({
      client: redisClient,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: false,
    },
  })
);

app.all("/", (req, res, next) => {
  switch (req.acceptsLanguages(["pl", "en"])) {
    case "pl":
      res.redirect("/pl/home");
      break;
    case "en":
      res.redirect("/en/home");
      break;
  }
  console.log(req.acceptsLanguages(["pl", "en"]));
  next();
});

require("./config/passport-strategies");
app.use(passport.initialize());
app.use(passport.session());

app.use("/:lang/", UserRouter);
app.use("/:lang/", (req, res) => {
  res.send(req.url);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
