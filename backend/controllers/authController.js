import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",  // ✅ token now expires
  });

// ✅ Check if user exists (called in step 1 of login)
export const checkUser = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ msg: "UID is required" });

    const user = await User.findOne({ uid: uid.trim() });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Single login handler — uses one User model with role field
export const loginUser = async (req, res) => {
  try {
    const { uid, password, role } = req.body;
    if (!uid || !password || !role)
      return res.status(400).json({ msg: "UID, password and role are required" });

    // Find user by uid AND role — prevents student logging in as admin
    const user = await User.findOne({ uid: uid.trim(), role: role.toLowerCase() });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Check active status
    if (!user.isActive)
      return res.status(403).json({ msg: "Account is deactivated. Contact admin." });

    // ✅ Uses bcrypt comparePassword method from User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    const token = signToken(user._id, user.role);

    res.json({
      token,
      user: {
        _id:        user._id,
        uid:        user.uid,
        name:       user.name,
        role:       user.role,
        department: user.department,
        semester:   user.semester,
        subject:    user.subject,
        photo:      user.photo,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Register new user (admin use or setup)
export const registerUser = async (req, res) => {
  try {
    const { uid, name, password, role, department, semester, subject } = req.body;
    if (!uid || !name || !password || !role)
      return res.status(400).json({ msg: "All fields are required" });

    const existing = await User.findOne({ uid: uid.trim() });
    if (existing) return res.status(400).json({ msg: "UID already exists" });

    const user = await User.create({
      uid, name, password, role,
      department, semester, subject,
    });

    const token = signToken(user._id, user.role);
    res.status(201).json({
      token,
      user: { _id: user._id, uid: user.uid, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};