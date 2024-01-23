import Service from "./service.js";
import _ from "lodash";
const addReferenceLogo = async (req, res) => {
  const { lang, name, image } = req.body;

  try {
    let referenceLogo = await Service.addReferenceLogo(lang, name, image);

    return res.json({
      status: true,
      referenceLogo,
    });
  } catch (error) {
    console.log(error.message, "addReferenceLogo error");
    return res.json({ status: false, message: error.message });
  }
};

const updateReferenceLogo = async (req, res) => {
  const { referenceLogo } = req.body;
  const { referenceLogoId } = req.params;
  console.log(referenceLogo, "sdsfsfsdfsdsf");
  try {
    let updatedReferenceLogo = await Service.updateReferenceLogo(
      referenceLogoId,
      referenceLogo
    );

    return res.json({
      status: true,
      updatedReferenceLogo,
    });
  } catch (error) {
    console.log(error.message, "updateReferenceLogo error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteReferenceLogo = async (req, res) => {
  const { referenceLogoId } = req.params;

  try {
    await Service.deleteReferenceLogo(referenceLogoId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteReferenceLogo error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceLogos = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const referenceLogosQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let referenceLogos = await Service.getReferenceLogos(referenceLogosQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...referenceLogos });
  } catch (error) {
    console.log(error.message, "getReferenceLogos error");
    return res.json({ status: false, message: error.message });
  }
};

const getReferenceLogo = async (req, res) => {
  try {
    const ReferenceLogoQuery = _.omitBy(
      {
        _id: req.params.referenceLogoId,
      },
      (a) => a === undefined
    );

    let referenceLogo = await Service.getReferenceLogo(ReferenceLogoQuery);
    return res.json({ status: true, referenceLogo });
  } catch (error) {
    console.log(error.message, "getReferenceLogo error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addReferenceLogo,
  updateReferenceLogo,
  deleteReferenceLogo,
  getReferenceLogos,
  getReferenceLogo,
};
