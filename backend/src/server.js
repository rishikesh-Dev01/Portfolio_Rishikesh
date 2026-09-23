import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import contactRoutes from "./routes/contact.js";
import githubRoutes from "./routes/github.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & parsing
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Rishikesh Pal Portfolio API",
    version: "1.0.0",
    endpoints: ["/api/projects", "/api/skills", "/api/contact", "/api/github/repos", "/api/health"],
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/github", githubRoutes);

// 404 & error
app.use(notFound);
app.use(errorHandler);

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Env: ${process.env.NODE_ENV || "development"}`);
  });
});

export default app;
