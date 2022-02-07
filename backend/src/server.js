const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./nodeConnection");
const session = require("express-session");
const redis = require("redis");
const passport = require("passport");
const cors = require("cors");

let Promise = require("bluebird");
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: "eventsession.redis.cache.windows.net",
  port: 6380,
  auth_pass: "DIFgMjn0rjmbGM48y4WLlAH5kRjlAYhTbAzCaM0VfPM=",
  tls: {
    servername: "eventsession.redis.cache.windows.net",
  },
});

const app = express();
app.use(cors());

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
const EventRouter = require("./routes/EventRouter");
const VenueRouter = require("./routes/VenueRouter");

app.use(
  session({
    secret: "rlSCrT42Dm2orDs13",
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
  next();
});

require("./config/passport-strategies");
app.use(passport.initialize());
app.use(passport.session());

app.use("/:lang/", UserRouter);
app.use("/:lang/", EventRouter);
app.use("/:lang/", VenueRouter);
app.use("/:lang/", (req, res) => {
  res.send(req.url);
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
