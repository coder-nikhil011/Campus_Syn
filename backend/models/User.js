const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "faculty", "teacher", "organizer", "admin"],
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);