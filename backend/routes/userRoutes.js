const express = require("express");
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

// READ all users (admin only)
router.get("/", auth, getUsers);

// READ single user profile
router.get("/:id", auth, getUserById);

// UPDATE user details
router.put("/:id", auth, updateUser);

// DELETE user
router.delete("/:id", auth, deleteUser);

module.exports = router;