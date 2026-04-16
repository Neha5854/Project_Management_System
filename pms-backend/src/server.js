import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import goalRoutes from "./routes/goalRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pms";

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PMS API is running."
  });
});

app.use("/api/goals", goalRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});
app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("[server] Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("[server] MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`[server] Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("[server] Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
