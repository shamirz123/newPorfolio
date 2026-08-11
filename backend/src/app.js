import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3003")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin / server tools with no Origin header
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }

      // Don't throw — throwing strips CORS headers on preflight
      console.warn(`CORS blocked origin: ${origin}. Allowed: ${allowedOrigins.join(", ")}`);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cloudinaryReady =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;
const onServerless = Boolean(
  process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT
);

if (!cloudinaryReady && !onServerless) {
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    uploads: cloudinaryReady ? "cloudinary" : onServerless ? "missing-cloudinary" : "disk",
    allowedOrigins,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err instanceof Error && err.message.includes("Only image")) {
    return res.status(400).json({ message: err.message });
  }
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Image must be under 5MB" });
  }
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;
