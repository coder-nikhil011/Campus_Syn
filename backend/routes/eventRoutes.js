import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// READ — any logged-in user (students + teachers can view events)
router.get("/",    protect, getEvents);
router.get("/:id", protect, getEventById);

// ✅ CREATE — organizer or admin only
router.post("/", protect, authorize("organizer", "admin"), upload.single("poster"), createEvent);

// ✅ UPDATE — organizer or admin only
router.put("/:id", protect, authorize("organizer", "admin"), upload.single("poster"), updateEvent);

// ✅ DELETE — organizer or admin only
router.delete("/:id", protect, authorize("organizer", "admin"), deleteEvent);

export default router;