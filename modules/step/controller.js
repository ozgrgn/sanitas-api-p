import Service from "./service.js";
import _ from "lodash";
const addStep = async (req, res) => {
  const {
    lang,
    title,
    description,
    svg,
    perma,
    text,
    image,
  } = req.body;

  try {
    let step = await Service.addStep(
      lang,
      title,
      description,
      svg,
      perma,
      text,
      image,
    );

    return res.json({
      status: true,
      step,
    });
  } catch (error) {
    console.log(error.message, "addStep error");
    return res.json({ status: false, message: error.message });
  }
};

const updateStep = async (req, res) => {
  const { step } = req.body;
  const { stepId } = req.params;
  console.log(step, "sdsfsfsdfsdsf");
  try {
    let updatedStep = await Service.updateStep(stepId, step);

    return res.json({
      status: true,
      updatedStep,
    });
  } catch (error) {
    console.log(error.message, "updateStep error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteStep = async (req, res) => {
  const { stepId } = req.params;

  try {
    await Service.deleteStep(stepId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteStep error");
    return res.json({ status: false, message: error.message });
  }
};

const getSteps = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const stepsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let steps = await Service.getSteps(stepsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...steps });
  } catch (error) {
    console.log(error.message, "getSteps error");
    return res.json({ status: false, message: error.message });
  }
};

const getStep = async (req, res) => {
  try {
    const StepQuery = _.omitBy(
      {
        _id: req.params.stepId,
      },
      (a) => a === undefined
    );

    let step = await Service.getStep(StepQuery);
    return res.json({ status: true, step });
  } catch (error) {
    console.log(error.message, "getStep error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addStep,
  updateStep,
  deleteStep,
  getSteps,
  getStep,
};
