import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    svg: { type: String, required: false },
    perma: { type: String, required: false },
    text: { type: String, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Feature = mongoose.model("Feature", FeatureSchema);

export default {
  Feature,
};
