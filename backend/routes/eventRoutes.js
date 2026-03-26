const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");
const auth = require("../middleware/authMiddleware");

// READ all events
router.get("/", auth, getEvents);

// READ single event
router.get("/:id", auth, getEventById);

// CREATE new event
router.post("/", auth, createEvent);

// UPDATE event
router.put("/:id", auth, updateEvent);

// DELETE event
router.delete("/:id", auth, deleteEvent);

module.exports = router;