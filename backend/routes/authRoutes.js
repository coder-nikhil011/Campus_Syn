const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/student/login", authController.studentLogin);
router.post("/faculty/login", authController.facultyLogin);
router.post("/teacher/login", authController.teacherLogin);
router.post("/organizer/login", authController.organizerLogin);
router.post("/admin/login", authController.adminLogin);

module.exports = router;