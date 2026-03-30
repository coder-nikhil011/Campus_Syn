import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes       from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import eventRoutes      from "./routes/eventRoutes.js";
import userRoutes       from "./routes/userRoutes.js";   // ✅ was missing

dotenv.config();
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Auto-create upload folders on startup
["uploads/assignments", "uploads/posters", "uploads/general"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ✅ CORS restricted to frontend origin
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth",       authRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/event",      eventRoutes);
app.use("/api/user",       userRoutes);   // ✅ was missing

// Health check
app.get("/", (req, res) => res.json({ msg: "Campus_Syn API running ✅" }));

// ✅ Global error handler — catches any unhandled errors
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(err.status || 500).json({ msg: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));