const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // organizer/admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);