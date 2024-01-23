import Model from "./model.js";

const getFeatures = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const features = await Model.Feature.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Feature.countDocuments(query);

  return { features, count };
};

const getFeature = async (query) => {
  return Model.Feature.findOne(query);
};

const addFeature = async (
  lang,
    title,
    description,
    svg,
    perma,
    text,
    image,
) => {
  try {
    return new Model.Feature({
      lang,
      title,
      description,
      svg,
      perma,
      text,
      image,
    }).save();
  } catch (error) {
    console.log("addFeature service error", error);
    throw new Error(error.message);
  }
};

const updateFeature = async (featureId, feature) => {
  try {
    let isExistFeature = await Model.Feature.findById(featureId);

    if (!isExistFeature) {
      throw new Error(
        JSON.stringify({
          en: "Feature is not found.",
          tr: "Feature bulunamadı.",
        })
      );
    }

    return Model.Feature.findOneAndUpdate(
      { _id: isExistFeature._id },
      { ...feature },
      { new: true }
    );
  } catch (error) {
    console.log("updateFeature service error", error);
    throw new Error(error.message);
  }
};

const deleteFeature = async (featureId) => {
  try {
    return Model.Feature.deleteOne({ _id: featureId });
  } catch (error) {
    console.log("deleteFeature service error", error);
    throw new Error(error.message);
  }
};

export default {
  addFeature,
  updateFeature,
  deleteFeature,
  getFeatures,
  getFeature,
};
