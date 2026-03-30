import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      poster:    req.file ? `/uploads/${req.file.filename}` : "",
      createdBy: req.user.id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file && { poster: `/uploads/${req.file.filename}` }),
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ msg: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};