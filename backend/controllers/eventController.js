import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ msg: "Event not found" });
  res.json(event);
};

export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
};

export const updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: "Event deleted" });
};