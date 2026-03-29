import express from "express";
import {
  studentLogin,
  facultyLogin,
  teacherLogin,
  organizerLogin,
  adminLogin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/student/login", studentLogin);
router.post("/faculty/login", facultyLogin);
router.post("/teacher/login", teacherLogin);
router.post("/organizer/login", organizerLogin);
router.post("/admin/login", adminLogin);

export default router;