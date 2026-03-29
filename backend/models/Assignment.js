import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  filePath: String, // uploaded file path
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // faculty/admin
  createdAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;