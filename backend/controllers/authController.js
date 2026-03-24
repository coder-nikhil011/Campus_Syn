import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { uid, password, role } = req.body;

  try {
    const user = await User.findOne({ uid, password, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};