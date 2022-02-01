const express = require("express");
const router = express.Router();
const Event_Controller = require("../controllers/EventController");

router.get("/events", Event_Controller.getEvents);
router.post("/events/new", Event_Controller.addEvent);
router.get("/events/:id", Event_Controller.getEvent);
router.patch("/events/:id/edit", Event_Controller.editEvent);
router.delete("/events/:id/edit", Event_Controller.deleteEvent);

module.exports = router;
