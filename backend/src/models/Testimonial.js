import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, default: "", trim: true, maxlength: 120 },
    quote: { type: String, required: true, trim: true, maxlength: 600 },
    // Public submissions start as "pending" and only show on the site once approved.
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
