import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// READ all users
router.get("/", auth, getUsers);

// READ single user
router.get("/:id", auth, getUserById);

// UPDATE user
router.put("/:id", auth, updateUser);

// DELETE user
router.delete("/:id", auth, deleteUser);

export default router;