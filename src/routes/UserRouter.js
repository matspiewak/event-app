const express = require("express");
const router = express.Router();
const User_Controller = require("../controllers/UserController");

router.post("/signup", User_Controller.signUp);
router.get("/signup", (req, res) => {
  res.send("elo");
});

module.exports = router;
