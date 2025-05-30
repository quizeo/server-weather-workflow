import express from "express";
import ModelHistoryLog from "../Models/modelHistoryLog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await ModelHistoryLog.find().sort({ dateSent: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
