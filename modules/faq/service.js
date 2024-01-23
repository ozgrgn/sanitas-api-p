import Model from "./model.js";

const getFaqs = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const faqs = await Model.Faq.find(query, {}, queryOptions).sort({
    order: 1,
  }).populate("treatment");
  const count = await Model.Faq.countDocuments(query);

  return { faqs, count };
};

const getFaq = async (query) => {
  console.log(query, "servis query")
  return Model.Faq.findOne(query);
};

const addFaq = async (
  lang,
  question,
  answer,
  general,
  isActive,
  order,
  treatment
) => {
  try {
    return new Model.Faq({
      lang,
      question,
      answer,
      general,
      isActive,
      order,
      treatment
    }).save();
  } catch (error) {
    console.log("addFaq service error", error);
    throw new Error(error.message);
  }
};

const updateFaq = async (faqId, faq) => {
  try {
    let isExistFaq = await Model.Faq.findById(faqId);

    if (!isExistFaq) {
      throw new Error(
        JSON.stringify({
          en: "Faq is not found.",
          tr: "Faq bulunamadı.",
        })
      );
    }

    return Model.Faq.findOneAndUpdate(
      { _id: isExistFaq._id },
      { ...faq },
      { new: true }
    );
  } catch (error) {
    console.log("updateFaq service error", error);
    throw new Error(error.message);
  }
};

const deleteFaq = async (faqId) => {
  try {
    return Model.Faq.deleteOne({ _id: faqId });
  } catch (error) {
    console.log("deleteFaq service error", error);
    throw new Error(error.message);
  }
};

export default {
  addFaq,
  updateFaq,
  deleteFaq,
  getFaqs,
  getFaq
};
