import express from "express";
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment
} from "../controllers/assignmentController.js";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// READ all assignments
router.get("/", auth, getAssignments);

// READ single assignment
router.get("/:id", auth, getAssignmentById);

// CREATE new assignment (faculty/admin only)
router.post("/", auth, upload.single("file"), createAssignment);

// UPDATE assignment
router.put("/:id", auth, upload.single("file"), updateAssignment);

// DELETE assignment
router.delete("/:id", auth, deleteAssignment);

// SUBMIT assignment (student uploads file)
router.post("/submit", auth, upload.single("file"), submitAssignment);

export default router;