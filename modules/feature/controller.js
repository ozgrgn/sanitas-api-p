import Service from "./service.js";
import _ from "lodash";
const addFeature = async (req, res) => {
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
    let feature = await Service.addFeature(
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
      feature,
    });
  } catch (error) {
    console.log(error.message, "addFeature error");
    return res.json({ status: false, message: error.message });
  }
};

const updateFeature = async (req, res) => {
  const { feature } = req.body;
  const { featureId } = req.params;
  console.log(feature, "sdsfsfsdfsdsf");
  try {
    let updatedFeature = await Service.updateFeature(featureId, feature);

    return res.json({
      status: true,
      updatedFeature,
    });
  } catch (error) {
    console.log(error.message, "updateFeature error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteFeature = async (req, res) => {
  const { featureId } = req.params;

  try {
    await Service.deleteFeature(featureId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteFeature error");
    return res.json({ status: false, message: error.message });
  }
};

const getFeatures = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const featuresQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let features = await Service.getFeatures(featuresQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...features });
  } catch (error) {
    console.log(error.message, "getFeatures error");
    return res.json({ status: false, message: error.message });
  }
};

const getFeature = async (req, res) => {
  try {
    const FeatureQuery = _.omitBy(
      {
        _id: req.params.featureId,
      },
      (a) => a === undefined
    );

    let feature = await Service.getFeature(FeatureQuery);
    return res.json({ status: true, feature });
  } catch (error) {
    console.log(error.message, "getFeature error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addFeature,
  updateFeature,
  deleteFeature,
  getFeatures,
  getFeature,
};
