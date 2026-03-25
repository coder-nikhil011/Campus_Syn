import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  dueDate: String,
  file: String,
  createdBy: String,
});

export default mongoose.model("Assignment", schema);