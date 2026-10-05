import { Router } from "express";
import { Testimonial } from "../models/Testimonial.js";
import { requireAuth } from "../middleware/auth.js";
import { clientIp, createRateLimiter } from "../utils/rateLimit.js";

const router = Router();

const isLimited = createRateLimiter(3, 60 * 60 * 1000); // 3 submissions / hour / IP

const publicFields = "name role quote createdAt";

// Public: approved testimonials only.
router.get("/", async (_req, res) => {
  try {
    const items = await Testimonial.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .select(publicFields);
    res.json(items);
  } catch (error) {
    console.error("Get testimonials error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Public: anyone with the link can submit; it stays hidden until approved.
router.post("/", async (req, res) => {
  try {
    // Honeypot: real people never see/fill this field, bots usually do.
    if (req.body?.website) return res.status(201).json({ message: "Thank you!" });

    if (isLimited(clientIp(req))) {
      return res.status(429).json({ message: "Too many submissions — please try again later." });
    }

    const str = (v) => (typeof v === "string" ? v.trim() : "");
    const name = str(req.body?.name);
    const role = str(req.body?.role);
    const quote = str(req.body?.quote);

    if (!name || !quote) {
      return res.status(400).json({ message: "Name and feedback are required" });
    }
    if (name.length > 80 || role.length > 120) {
      return res.status(400).json({ message: "Name or role is too long" });
    }
    if (quote.length < 20) {
      return res.status(400).json({ message: "Please write at least a sentence (20+ characters)" });
    }
    if (quote.length > 600) {
      return res.status(400).json({ message: "Please keep feedback under 600 characters" });
    }

    await Testimonial.create({ name, role, quote });
    res.status(201).json({ message: "Thank you! Your feedback will appear after review." });
  } catch (error) {
    console.error("Create testimonial error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: everything, including pending.
router.get("/admin/all", requireAuth, async (_req, res) => {
  try {
    res.json(await Testimonial.find().sort({ createdAt: -1 }));
  } catch (error) {
    console.error("Admin list testimonials error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });

    const { status } = req.body || {};
    if (status !== undefined) {
      if (!["pending", "approved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      item.status = status;
    }
    await item.save();
    res.json(item);
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    await item.deleteOne();
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
