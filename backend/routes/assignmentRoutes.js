import mongoose from "mongoose";

// ✅ Sub-schema for student submissions
const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: { type: String },
    studentUid:  { type: String },
    note:        { type: String, default: "" },
    status: {
      type: String,
      enum: ["submitted", "late"],
      default: "submitted",
    },
  },
  { timestamps: true }  // gives submittedAt automatically
);

const assignmentSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    subject:     { type: String, default: "" },       // ✅ added — frontend uses a.subject
    dueDate:     { type: Date,   required: true },
    totalMarks:  { type: Number, default: 100 },      // ✅ added
    filePath:    { type: String, default: "" },        // uploaded file

    // ✅ Target specific students
    targetSemester:   { type: Number, default: null },
    targetDepartment: { type: String, default: null },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ Track who submitted
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;