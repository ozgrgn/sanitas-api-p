import Model from "./model.js";

const getSteps = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const steps = await Model.Step.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Step.countDocuments(query);

  return { steps, count };
};

const getStep = async (query) => {
  return Model.Step.findOne(query);
};

const addStep = async (
  lang,
    title,
    description,
    svg,
    perma,
    text,
    image,
) => {
  try {
    return new Model.Step({
      lang,
      title,
      description,
      svg,
      perma,
      text,
      image,
    }).save();
  } catch (error) {
    console.log("addStep service error", error);
    throw new Error(error.message);
  }
};

const updateStep = async (stepId, step) => {
  try {
    let isExistStep = await Model.Step.findById(stepId);

    if (!isExistStep) {
      throw new Error(
        JSON.stringify({
          en: "Step is not found.",
          tr: "Step bulunamadı.",
        })
      );
    }

    return Model.Step.findOneAndUpdate(
      { _id: isExistStep._id },
      { ...step },
      { new: true }
    );
  } catch (error) {
    console.log("updateStep service error", error);
    throw new Error(error.message);
  }
};

const deleteStep = async (stepId) => {
  try {
    return Model.Step.deleteOne({ _id: stepId });
  } catch (error) {
    console.log("deleteStep service error", error);
    throw new Error(error.message);
  }
};

export default {
  addStep,
  updateStep,
  deleteStep,
  getSteps,
  getStep,
};
