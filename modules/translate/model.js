import mongoose from "mongoose";

const TranslateSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    homePage: { type: String, required: false },
    about: { type: String, required: false },
    treatments: { type: String, required: false },
    contact: { type: String, required: false },
    language: { type: String, required: false },
    allTreatments: { type: String, required: false },
    book_an_appointment: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    mail: { type: String, required: false },
    send: { type: String, required: false },
    phone_required: { type: String, required: false },
    name_required: { type: String, required: false },
    email_required: { type: String, required: false },
    book: { type: String, required: false },
    address: { type: String, required: false },
    note: { type: String, required: false },
    subject: { type: String, required: false },
    faq: { type: String, required: false },
    faq1: { type: String, required: false },
    faq2: { type: String, required: false },
    review1: { type: String, required: false },
    review2: { type: String, required: false },
    group1: { type: String, required: false },
    group2: { type: String, required: false },
    about1: { type: String, required: false },
    about2: { type: String, required: false },
    form_header1: { type: String, required: false },
    form_header2: { type: String, required: false },
    form_button: { type: String, required: false },
    form_sent: { type: String, required: false },
    read_more: { type: String, required: false },
    posted_on: { type: String, required: false },
    health_tourism:{ type: String, required: false },

  },
  { timestamps: true }
);

export const Translate = mongoose.model("Translate", TranslateSchema);

export default {
  Translate,
};
