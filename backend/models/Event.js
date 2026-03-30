import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },          // ✅ was "name" — frontend uses e.title
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    time: { type: String, default: "" },              // ✅ added — e.g. "10:30 AM"
    location: { type: String, default: "" },
    poster: { type: String, default: "" },            // ✅ added — file path for uploaded poster
    category: {
      type: String,
      enum: ["academic", "cultural", "sports", "tech", "other"],
      default: "other",
    },
    targetAudience: {
      type: String,
      enum: ["all", "students", "teachers"],
      default: "all",
    },
    registrationLink: { type: String, default: "" },  // ✅ added — external form link
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }  // ✅ auto adds createdAt + updatedAt
);

const Event = mongoose.model("Event", eventSchema);
export default Event;