const express = require("express");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient();
redisClient.on("error", (err) => {
  console.log(`RedisError: ${err}`);
});

const app = express();
require("dotenv").config();

const { dbConnection } = require("./nodeConnection");
dbConnection();

app.use(express.json());

app.use(
  session({
    secret: process.env.REDIS_SECRET,
    store: new RedisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
    }),
    saveUninitialized: false,
    resave: false,
  })
);

const UserRouter = require("./routes/UserRouter");

app.use("/", UserRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
