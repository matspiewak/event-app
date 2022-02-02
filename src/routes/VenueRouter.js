const express = require("express");
const router = express.Router();
const Venue_Controller = require("../controllers/VenueController");

router.get("/venues", Venue_Controller.getVenues);
router.post("/venues/new", Venue_Controller.addVenue);
router.get("/venues/:id", Venue_Controller.getVenue);
router.patch("/venues/:id/edit", Venue_Controller.editVenue);
router.delete("/venues/:id/edit", Venue_Controller.deleteVenue);

module.exports = router;
