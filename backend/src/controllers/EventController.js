const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

exports.verifySigned = (req, res, next) => {
  const session = req.session;
  if (!session.organization) {
    return res.status(403).json({ message: "You have to be signed in" });
  } else if (session.organization.isOrganiser) {
    console.log(session);
    next();
  } else {
    return res.status(403).json({ message: "No organizer status" });
  }

  // if (typeof session != "undefined" && session.organization.isOrganiser) {
  //   next();
  // } else
};

exports.getEvents = async (req, res) => {
  await Event.find({})
    .populate("ownerId")
    .populate("venueId", ["address", "title"])
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getEvent = async (req, res) => {
  await Event.findById(req.params.id)
    .populate("ownerId", ["organization.name"])
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.followEvent = async (req, res) => {
  await Promise.all([
    Event.findByIdAndUpdate(req.params.id, {
      $push: {
        followers: req.session.userId,
      },
    }),
    User.findByIdAndUpdate(req.session.userId, {
      $push: {
        following: req.params.id,
      },
    }),
  ])
    .then(res.status(200).json({ message: "event added to followed list" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.addEvent = async (req, res) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
    ageRestriction: {
      isAgeRestricted: req.body.ageRestriction.isAgeRestricted,
      ageRestrictionValue: req.body.ageRestriction.ageRestrictionValue,
    },
    ticketsLeft: req.body.ticketsLeft,
    eventWebsite: req.body.eventWebsite,
    ownerId: req.body.ownerId,
    venueId: req.body.venueId,
    isActive: req.body.isActive,
    tags: req.body.tags,
  });
  await event
    .save()
    .then(res.status(200).json({ message: "event created successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.editEvent = async (req, res) => {
  //! need redirect
  const updatedEvent = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
    ageRestriction: {
      isAgeRestricted: req.body.ageRestriction.isAgeRestricted,
      ageRestrictionValue: req.body.ageRestriction.ageRestrictionValue,
    },
    ticketsLeft: req.body.ticketsLeft,
    eventWebsite: req.body.eventWebsite,
    ownerId: req.body.ownerId,
    placeId: req.body.placeId,
    isActive: req.body.isActive,
    tags: req.body.tags,
  });
  await Event.findByIdAndUpdate({ id: req.params.id }, updatedEvent)
    .then(res.status(200).json({ message: "Event updated successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteEvent = async (req, res) => {
  //! need redirect
  await Event.findByIdAndDelete({ id: req.params.id })
    .then(res.status(200).json({ message: "Event deleted successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
