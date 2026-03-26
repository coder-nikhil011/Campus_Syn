const Event = require("../models/Event");

// Get all events
exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// Get single event
exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};

// Create event
exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
};

// Update event
exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
};

// Delete event
exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};