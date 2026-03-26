const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Teacher = require("../models/Teacher");
const Organizer = require("../models/Organizer");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res, model, role) {
  const { uid, password } = req.body;
  const user = await model.findOne({ uid });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Invalid password" });

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
  res.json({ success: true, token, user: { id: user._id, role, name: user.name } });
}

exports.studentLogin = (req, res) => loginUser(req, res, Student, "student");
exports.facultyLogin = (req, res) => loginUser(req, res, Faculty, "faculty");
exports.teacherLogin = (req, res) => loginUser(req, res, Teacher, "teacher");
exports.organizerLogin = (req, res) => loginUser(req, res, Organizer, "organizer");
exports.adminLogin = (req, res) => loginUser(req, res, Admin, "admin");