import express from "express";
import ModelHistoryLog from "../Models/modelHistoryLog.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const deletedLog = await ModelHistoryLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ error: "Log not found" });
    }

    res.json({ message: "Log deleted successfully", log: deletedLog });
  } catch (err) {
    console.error("Error deleting log:", err);
    res.status(500).json({ error: "Failed to delete log" });
  }
});

export default router;
