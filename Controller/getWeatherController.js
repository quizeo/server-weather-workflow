import express from "express";
import fetchWeather from "../utils/fetchWeather.js";
import sendEmail from "../utils/sendEmail.js";
import ModelHistoryLog from "../Models/modelHistoryLog.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { city, email } = req.body;

  if (!city || !email)
    return res.status(400).json({ error: "City and email required" });

  try {
    const weather = await fetchWeather(city);
    await sendEmail(email, weather);

    // Save to MongoDB
    const log = new ModelHistoryLog({ city, email, weather });
    await log.save();

    res.json({ message: "Weather sent ", log });
  } catch (err) {
    console.error("Error in weather endpoint:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
