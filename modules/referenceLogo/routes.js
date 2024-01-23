import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceLogos.create_referenceLogo] }),
  body(["lang"]).exists(),
  body([
    "name",
    "image",
  ]).optional(),
  validator,
  Controller.addReferenceLogo
);

router.put(
  "/:referenceLogoId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceLogos.update_referenceLogo] }),
  param("referenceLogoId").exists(),
  body(["referenceLogo"]).exists(),
  validator,
  Controller.updateReferenceLogo
);

router.delete(
  "/:referenceLogoId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceLogos.delete_referenceLogo] }),
  param("referenceLogoId").exists(),
  validator,
  Controller.deleteReferenceLogo
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getReferenceLogos
);

router.get(
  "/:referenceLogoId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceLogos.read_referenceLogo] }),
  param("referenceLogoId").exists(),
  validator,
  Controller.getReferenceLogo
);
export default router;
