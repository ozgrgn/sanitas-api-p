import Service from "./service.js";
import _ from "lodash";
const addFaq = async (req, res) => {
  const {
    lang,
    question,
    answer,
    general,
    isActive,
    order,
    treatment
  } = req.body;

  try {
    let faq = await Service.addFaq(
      lang,
      question,
      answer,
      general,
      isActive,
      order,
      treatment
    );

    return res.json({
      status: true,
      faq,
    });
  } catch (error) {
    console.log(error.message, "addFaq error");
    return res.json({ status: false, message: error.message });
  }
};

const updateFaq = async (req, res) => {
  const { faq } = req.body;
  const { faqId } = req.params;
  console.log(faq, "sdsfsfsdfsdsf");
  try {
    let updatedFaq = await Service.updateFaq(
      faqId,
      faq
    );

    return res.json({
      status: true,
      updatedFaq,
    });
  } catch (error) {
    console.log(error.message, "updateFaq error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteFaq = async (req, res) => {
  const { faqId } = req.params;

  try {
    await Service.deleteFaq(faqId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteFaq error");
    return res.json({ status: false, message: error.message });
  }
};

const getFaqs = async (req, res) => {
  const { limit, skip, lang, treatment, isActive,general} = req.query;

  try {
    const faqsQuery = _.omitBy(
      {
        lang,
        isActive,
        treatment,
        general
      },
      (a) => a === undefined
    );
    let faqs = await Service.getFaqs(faqsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...faqs });
  } catch (error) {
    console.log(error.message, "getFaqs error");
    return res.json({ status: false, message: error.message });
  }
};

const getFaq = async (req, res) => {
  try {
    const FaqQuery = _.omitBy(
      {
        _id: req.params.faqId,
      },
      (a) => a === undefined
    );

    let faq = await Service.getFaq(FaqQuery);
    return res.json({ status: true, faq });
  } catch (error) {
    console.log(error.message, "getFaq error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addFaq,
  updateFaq,
  deleteFaq,
  getFaqs,
  getFaq
};
