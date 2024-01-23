import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    health_spot: { type: String, required: false },
    health_title: { type: String, required: false },
    health_left: { type: String, required: false },
    health_right: { type: String, required: false },
    health_subTitle1: { type: String, required: false },
    health_subTitle2: { type: String, required: false },
    images: { type: [], default: [] },
    logos: { type: [], default: [] },
  },
  { timestamps: true }
);

export const Health = mongoose.model("Health", HealthSchema);

export default {
  Health,
};
