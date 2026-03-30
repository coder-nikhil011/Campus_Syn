import express from "express";
import {
  checkUser,      // ✅ step 1 — check if UID exists
  loginUser,      // ✅ step 2 — login with password
  registerUser,   // ✅ register new user
} from "../controllers/authController.js";

const router = express.Router();

// ✅ Frontend calls this in step 1 of login
router.post("/check-user", checkUser);

// ✅ Single login endpoint for all roles
router.post("/login", loginUser);

// ✅ Register (admin use or initial setup)
router.post("/register", registerUser);

export default router;