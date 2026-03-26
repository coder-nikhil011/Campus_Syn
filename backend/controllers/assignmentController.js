const Assignment = require("../models/Assignment");

// Get all assignments
exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
};

// Get single assignment
exports.getAssignmentById = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  res.json(assignment);
};

// Create assignment (faculty/admin)
exports.createAssignment = async (req, res) => {
  const assignment = new Assignment({
    ...req.body,
    filePath: req.file ? req.file.path : null
  });
  await assignment.save();
  res.json(assignment);
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    { ...req.body, filePath: req.file ? req.file.path : undefined },
    { new: true }
  );
  res.json(updated);
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Assignment deleted" });
};

// Submit assignment (student upload)
exports.submitAssignment = async (req, res) => {
  const submission = {
    studentId: req.user.id,
    assignmentId: req.body.assignmentId,
    filePath: req.file.path,
    submittedAt: new Date()
  };
  // You can store submissions in a separate collection
  res.json({ success: true, submission });
};