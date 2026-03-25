import express from "express";
import Assignment from "../models/Assignment.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// CREATE (with file)
router.post("/", upload.single("file"), async (req, res) => {
  const data = new Assignment({
    ...req.body,
    file: req.file?.filename,
  });

  await data.save();
  res.json(data);
});

// READ
router.get("/", async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;