const express = require("express");
const router = express.Router();
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment
} = require("../controllers/assignmentController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

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

module.exports = router;