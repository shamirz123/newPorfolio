import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },
    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    accent: {
      type: String,
      default: "#C9A27A",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
