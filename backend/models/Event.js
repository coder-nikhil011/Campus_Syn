import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // organizer/admin
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;