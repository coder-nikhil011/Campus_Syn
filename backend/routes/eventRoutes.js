import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const data = new Event(req.body);
  await data.save();
  res.json(data);
});

// READ
router.get("/", async (req, res) => {
  const data = await Event.find();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;