const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./nodeConnection");
const session = require("express-session");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

const app = express();

redisClient.on("connect", () => {
  console.log("RedisClient connected successfully");
});
redisClient.on("error", (err) => {
  console.log(`RedisError: ${err}`);
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

app.use("/", UserRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
