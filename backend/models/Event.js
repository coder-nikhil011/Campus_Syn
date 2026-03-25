import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: String,
  venue: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// ✅ Prevent model overwrite error
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;