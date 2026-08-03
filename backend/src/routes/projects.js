import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Project } from "../models/Project.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../../uploads");

function parseTech(value) {
  if (Array.isArray(value)) {
    return value.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function removeUploadedFile(imagePath) {
  if (!imagePath?.startsWith("/uploads/")) return;
  const filename = path.basename(imagePath);
  const fullPath = path.join(uploadsDir, filename);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}

router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, description, liveUrl, githubUrl, accent, order } =
      req.body;

    if (!title?.trim() || !description?.trim()) {
      if (req.file) removeUploadedFile(`/uploads/${req.file.filename}`);
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

    const project = await Project.create({
      title: title.trim(),
      subtitle: subtitle?.trim() || "",
      description: description.trim(),
      image: `/uploads/${req.file.filename}`,
      liveUrl: liveUrl?.trim() || "",
      githubUrl: githubUrl?.trim() || "",
      tech: parseTech(req.body.tech),
      accent: accent?.trim() || "#C9A27A",
      order: Number(order) || 0,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

router.put("/:id", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      if (req.file) removeUploadedFile(`/uploads/${req.file.filename}`);
      return res.status(404).json({ message: "Project not found" });
    }

    const { title, subtitle, description, liveUrl, githubUrl, accent, order } =
      req.body;

    if (title !== undefined) project.title = title.trim();
    if (subtitle !== undefined) project.subtitle = subtitle.trim();
    if (description !== undefined) project.description = description.trim();
    if (liveUrl !== undefined) project.liveUrl = liveUrl.trim();
    if (githubUrl !== undefined) project.githubUrl = githubUrl.trim();
    if (accent !== undefined) project.accent = accent.trim() || "#C9A27A";
    if (order !== undefined) project.order = Number(order) || 0;
    if (req.body.tech !== undefined) project.tech = parseTech(req.body.tech);

    if (req.file) {
      removeUploadedFile(project.image);
      project.image = `/uploads/${req.file.filename}`;
    }

    await project.save();
    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    removeUploadedFile(project.image);
    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
