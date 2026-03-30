import Assignment from "../models/Assignment.js";

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single assignment
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: "Assignment not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Create assignment (teacher/admin only)
export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      filePath:  req.file ? req.file.path : null,
      createdBy: req.user.id,   // ✅ attach creator from JWT
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file && { filePath: req.file.path }),
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ msg: "Assignment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ msg: "Assignment not found" });
    res.json({ msg: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Submit assignment — actually saves to DB now
export const submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: "Assignment not found" });

    // Check if already submitted
    const already = assignment.submissions.find(
      (s) => s.student.toString() === req.user.id
    );
    if (already) return res.status(400).json({ msg: "Already submitted" });

    const isLate = new Date() > new Date(assignment.dueDate);

    // ✅ Push submission into the array and save
    assignment.submissions.push({
      student:     req.user.id,
      studentName: req.user.name,
      studentUid:  req.user.uid,
      note:        req.body.note || "",
      status:      isLate ? "late" : "submitted",
    });

    await assignment.save();
    res.json({ msg: "Assignment submitted successfully", assignment });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};