import fs from "fs";
import multer from "multer";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { isCloudinaryEnabled } from "../utils/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vercel/Lambda filesystem is read-only under /var/task.
 * Detect that even if VERCEL env is missing in some bundlers.
 */
export const isServerless = Boolean(
  process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    __dirname.startsWith("/var/task")
);

/** Local/Render can write to backend/uploads; serverless must not. */
export const uploadsDir = isServerless
  ? path.join(os.tmpdir(), "portfolio-uploads")
  : path.join(__dirname, "../../uploads");

if (!isCloudinaryEnabled() && !isServerless) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype.split("/")[1] || "");
  if (extOk && mimeOk) return cb(null, true);
  cb(new Error("Only image files are allowed"));
}

/**
 * On Vercel/serverless: ALWAYS memory + Cloudinary (disk is read-only).
 * Local/Render: disk uploads folder is fine without Cloudinary.
 */
function resolveStorage() {
  if (isServerless || isCloudinaryEnabled()) {
    return multer.memoryStorage();
  }
  return diskStorage;
}

export const upload = multer({
  storage: resolveStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
