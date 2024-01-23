import Model from "./model.js";

const getReferenceLogos = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const referenceLogos = await Model.ReferenceLogo.find(
    query,
    {},
    queryOptions
  ).sort({
    order: 1,
  });
  const count = await Model.ReferenceLogo.countDocuments(query);

  return { referenceLogos, count };
};

const getReferenceLogo = async (query) => {
  return Model.ReferenceLogo.findOne(query);
};

const addReferenceLogo = async (lang, name, image) => {
  try {
    return new Model.ReferenceLogo({
      lang,
      name,
      image,
    }).save();
  } catch (error) {
    console.log("addReferenceLogo service error", error);
    throw new Error(error.message);
  }
};

const updateReferenceLogo = async (referenceLogoId, referenceLogo) => {
  try {
    let isExistReferenceLogo = await Model.ReferenceLogo.findById(
      referenceLogoId
    );

    if (!isExistReferenceLogo) {
      throw new Error(
        JSON.stringify({
          en: "ReferenceLogo is not found.",
          tr: "ReferenceLogo bulunamadı.",
        })
      );
    }

    return Model.ReferenceLogo.findOneAndUpdate(
      { _id: isExistReferenceLogo._id },
      { ...referenceLogo },
      { new: true }
    );
  } catch (error) {
    console.log("updateReferenceLogo service error", error);
    throw new Error(error.message);
  }
};

const deleteReferenceLogo = async (referenceLogoId) => {
  try {
    return Model.ReferenceLogo.deleteOne({ _id: referenceLogoId });
  } catch (error) {
    console.log("deleteReferenceLogo service error", error);
    throw new Error(error.message);
  }
};

export default {
  addReferenceLogo,
  updateReferenceLogo,
  deleteReferenceLogo,
  getReferenceLogos,
  getReferenceLogo,
};
