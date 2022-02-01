const express = require("express");
const router = express.Router();
const Venue_Controller = require("../controllers/VenueController");

router.post("/signup", User_Controller.signUp);
router.post("/signin", User_Controller.signIn);

module.exports = router;
