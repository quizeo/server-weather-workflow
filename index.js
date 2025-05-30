import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cron from "node-cron";
import fetchWeather from "./utils/fetchWeather.js";
import sendEmail from "./utils/sendEmail.js";
import getWeatherController from "./Controller/getWeatherController.js";
import mongoose from "mongoose";
import historyLogs from "./Controller/historyLogs.js";
import deleteController from "./Controller/deleteController.js";

const corsOptions = {
  origin: ["http://localhost:5173", "https://weather-frontend.netlify.app"],
};

const dbConnection = process.env.MONGO_URI;

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

//routes
app.use("/api/weather", getWeatherController);
app.use("/api/weather/logs", historyLogs);
app.use("/api/weather/delete", deleteController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// send email every 8am
const DEFAULT_CITY = process.env.DEFAULT_CITY;
const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL;

cron.schedule("0 8 * * *", async () => {
  try {
    const weather = await fetchWeather(DEFAULT_CITY);
    await sendEmail(DEFAULT_EMAIL, weather);
    console.log(` Email sent for ${DEFAULT_CITY} at 8AM`);
  } catch (err) {
    console.error("Error send scheduled email:", err.message);
  }
});

// connect to db
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
