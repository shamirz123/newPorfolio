import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

let ready;

async function ensureDb() {
  if (!ready) {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set");
    }
    ready = connectDB(process.env.MONGODB_URI).then(() => true);
  }
  await ready;
}

export default async function handler(req, res) {
  try {
    await ensureDb();
    return app(req, res);
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
}
