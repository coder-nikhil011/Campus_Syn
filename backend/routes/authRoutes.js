import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { uid, password, role } = req.body;
  try {
    const user = await User.findOne({ uid, role });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
      expiresIn: "1d",
    });

    const { password: pwd, ...safeUser } = user._doc;
    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Check if user exists
router.post("/check-user", async (req, res) => {
  const { uid } = req.body;
  const user = await User.findOne({ uid });
  res.json({ exists: !!user });
});

export default router;