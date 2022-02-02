const mongoose = require("mongoose");
const Venue = require("../models/Venue");

exports.getVenues = async (req, res) => {
  await Venue.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getVenue = async (req, res) => {
  await Venue.findById(req.params.id)
    .then((venue) => {
      res.status(200).json(venue);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.addVenue = async (req, res) => {
  const venue = new Venue({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      streetNumber: req.body.address.streetNumber,
      postalCode: req.body.address.postalCode,
    },
    isAvailable: req.body.isAvailable,
    tags: req.body.tags,
  });
  await venue
    .save()
    .then(res.status(200).json({ message: "Venue created successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.editVenue = async (req, res) => {
  //! need redirect
  const updatedVenue = new Venue({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      streetNumber: req.body.address.streetNumber,
      postalCode: req.body.address.postalCode,
    },
    isAvailable: req.body.isAvailable,
    tags: req.body.tags,
  });
  await Venue.findByIdAndUpdate({ id: req.params.id }, updatedVenue)
    .then(res.status(200).json({ message: "Venue updated successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteVenue = async (req, res) => {
  //! need redirect
  await Venue.findByIdAndDelete({ id: req.params.id })
    .then(res.status(200).json({ message: "Venue deleted successfully" }))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
