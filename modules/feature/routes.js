import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.features.create_feature] }),
  body(["lang"]).exists(),
  body([
    "title",
    "description",
    "svg",
    "perma", 
    "text",
    "image",
  ]).optional(),
  validator,
  Controller.addFeature
);

router.put(
  "/:featureId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.features.update_feature] }),
  param("featureId").exists(),
  body(["feature"]).exists(),
  validator,
  Controller.updateFeature
);

router.delete(
  "/:featureId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.features.delete_feature] }),
  param("featureId").exists(),
  validator,
  Controller.deleteFeature
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getFeatures
);

router.get(
  "/:featureId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.features.read_feature] }),
  param("featureId").exists(),
  validator,
  Controller.getFeature
);
export default router;
