import mongoose from "mongoose";

const ReferenceLogoSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    name: { type: String, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const ReferenceLogo = mongoose.model("ReferenceLogo", ReferenceLogoSchema);

export default {
  ReferenceLogo,
};
