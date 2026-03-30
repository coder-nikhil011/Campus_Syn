import express from "express";
import {
  getUsers,
  getUsersByRole,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin only — get all users or filter by role
router.get("/",            protect, authorize("admin"), getUsers);
router.get("/role/:role",  protect, authorize("admin"), getUsersByRole);

// ✅ Admin only — get single user
router.get("/:id",         protect, authorize("admin"), getUserById);

// ✅ Admin only — update, toggle, delete
router.put("/:id",         protect, authorize("admin"), updateUser);
router.put("/:id/toggle",  protect, authorize("admin"), toggleUserStatus);
router.delete("/:id",      protect, authorize("admin"), deleteUser);

export default router;