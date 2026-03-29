import Assignment from "../models/Assignment.js";

// Get all assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
};

// Get single assignment
export const getAssignmentById = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return res.status(404).json({ msg: "Assignment not found" });
  res.json(assignment);
};

// Create assignment
export const createAssignment = async (req, res) => {
  const assignment = new Assignment({
    ...req.body,
    filePath: req.file ? req.file.path : null,
  });
  await assignment.save();
  res.json(assignment);
};

// Update assignment
export const updateAssignment = async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    { ...req.body, filePath: req.file ? req.file.path : undefined },
    { new: true }
  );
  res.json(updated);
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ msg: "Assignment deleted" });
};

// Submit assignment
export const submitAssignment = async (req, res) => {
  const submission = {
    studentId: req.user.id,
    assignmentId: req.body.assignmentId,
    filePath: req.file.path,
    submittedAt: new Date(),
  };
  res.json({ success: true, submission });
};