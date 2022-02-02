const express = require("express");
const router = express.Router();
const User_Controller = require("../controllers/UserController");

router.post("/signup", User_Controller.signUp);
router.post("/signin", User_Controller.signIn);

module.exports = router;
