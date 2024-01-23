import Service from "./service.js";
import _ from "lodash";
const addHealth = async (req, res) => {
  const {
    lang,
    health_spot,
    health_title,
    health_left,
    health_right,
    health_subTitle1,
    health_subTitle2,
    images,
    logos,
  } = req.body;

  try {
    let health = await Service.addHealth(
      lang,
      health_spot,
      health_title,
      health_left,
      health_right,
      health_subTitle1,
      health_subTitle2,
      images,
      logos
    );

    return res.json({
      status: true,
      health,
    });
  } catch (error) {
    console.log(error.message, "addHealth error");
    return res.json({ status: false, message: error.message });
  }
};

const updateHealth = async (req, res) => {
  const { health } = req.body;
  const { healthId } = req.params;
  console.log(health, "sdsfsfsdfsdsf");
  try {
    let updatedHealth = await Service.updateHealth(healthId, health);

    return res.json({
      status: true,
      updatedHealth,
    });
  } catch (error) {
    console.log(error.message, "updateHealth error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteHealth = async (req, res) => {
  const { healthId } = req.params;

  try {
    await Service.deleteHealth(healthId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteHealth error");
    return res.json({ status: false, message: error.message });
  }
};

const getHealths = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const healthsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let healths = await Service.getHealths(healthsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...healths });
  } catch (error) {
    console.log(error.message, "getHealths error");
    return res.json({ status: false, message: error.message });
  }
};

const getHealth = async (req, res) => {
  try {
    const HealthQuery = _.omitBy(
      {
        _id: req.params.healthId,
      },
      (a) => a === undefined
    );

    let health = await Service.getHealth(HealthQuery);
    return res.json({ status: true, health });
  } catch (error) {
    console.log(error.message, "getHealth error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addHealth,
  updateHealth,
  deleteHealth,
  getHealths,
  getHealth,
};
