import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);
export default User;