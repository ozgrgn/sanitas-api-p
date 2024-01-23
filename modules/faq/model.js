import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    question: { type: String, required: false },
    answer: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: false, default:0 },
    general: { type: Boolean, default: false },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Treatment"
    },
  },
  { timestamps: true }
);

export const Faq = mongoose.model("Faq", FaqSchema);

export default {
  Faq,
};
