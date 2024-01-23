import mongoose from "mongoose";

const StepSchema = new mongoose.Schema(
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

export const Step = mongoose.model("Step", StepSchema);

export default {
  Step,
};
