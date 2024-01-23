import Model from "./model.js";

const getHealths = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const healths = await Model.Health.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Health.countDocuments(query);

  return { healths, count };
};

const getHealth = async (query) => {
  return Model.Health.findOne(query);
};

const addHealth = async (
  lang,
  health_spot,
  health_title,
  health_left,
  health_right,
  health_subTitle1,
  health_subTitle2,
  images,
  logos
) => {
  try {
    return new Model.Health({
      lang,
      health_spot,
      health_title,
      health_left,
      health_right,
      health_subTitle1,
      health_subTitle2,
      images,
      logos,
    }).save();
  } catch (error) {
    console.log("addHealth service error", error);
    throw new Error(error.message);
  }
};

const updateHealth = async (healthId, health) => {
  try {
    let isExistHealth = await Model.Health.findById(healthId);

    if (!isExistHealth) {
      throw new Error(
        JSON.stringify({
          en: "Health is not found.",
          tr: "Health bulunamadı.",
        })
      );
    }

    return Model.Health.findOneAndUpdate(
      { _id: isExistHealth._id },
      { ...health },
      { new: true }
    );
  } catch (error) {
    console.log("updateHealth service error", error);
    throw new Error(error.message);
  }
};

const deleteHealth = async (healthId) => {
  try {
    return Model.Health.deleteOne({ _id: healthId });
  } catch (error) {
    console.log("deleteHealth service error", error);
    throw new Error(error.message);
  }
};

export default {
  addHealth,
  updateHealth,
  deleteHealth,
  getHealths,
  getHealth,
};
