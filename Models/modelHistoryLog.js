import mongoose from "mongoose";

const weatherLogSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

const ModelHistoryLog = mongoose.model("WeatherLog", weatherLogSchema);

export default ModelHistoryLog;
