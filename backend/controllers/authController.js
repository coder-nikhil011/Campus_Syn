import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Teacher from "../models/Teacher.js";
import Organizer from "../models/Organizer.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser(req, res, model, role) {
  const { uid, password } = req.body;
  const user = await model.findOne({ uid });
  if (!user) return res.json({ success: false, msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, msg: "Invalid password" });

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
  res.json({ success: true, token, user: { id: user._id, role, name: user.name } });
}

export const studentLogin = (req, res) => loginUser(req, res, Student, "student");
export const facultyLogin = (req, res) => loginUser(req, res, Faculty, "faculty");
export const teacherLogin = (req, res) => loginUser(req, res, Teacher, "teacher");
export const organizerLogin = (req, res) => loginUser(req, res, Organizer, "organizer");
export const adminLogin = (req, res) => loginUser(req, res, Admin, "admin");