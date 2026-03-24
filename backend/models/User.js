import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: String,
  password: String,
  role: String, // Student, Teacher, Organizer, Admin
});

export default mongoose.model("User", userSchema);