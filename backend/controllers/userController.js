import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get all users — ✅ never return passwords
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get users by role
export const getUsersByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user — ✅ re-hashes password if it's being changed
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    // ✅ If password is being updated, hash it first
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ msg: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Toggle active/inactive
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ msg: `User ${user.isActive ? "activated" : "deactivated"}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { uid, password, role } = req.body;

    console.log("👉 Request Body:", req.body);

    const user = await User.findOne({ uid: uid.trim(), role: role.toLowerCase() });

    console.log("👉 User from DB:", user);

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await user.comparePassword(password);

    console.log("👉 Password Match:", isMatch);

    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    res.json({ msg: "Login Success" });

  } catch (err) {
    console.log("❌ Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};