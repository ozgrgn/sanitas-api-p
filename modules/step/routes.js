import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.steps.create_step] }),
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
  Controller.addStep
);

router.put(
  "/:stepId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.steps.update_step] }),
  param("stepId").exists(),
  body(["step"]).exists(),
  validator,
  Controller.updateStep
);

router.delete(
  "/:stepId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.steps.delete_step] }),
  param("stepId").exists(),
  validator,
  Controller.deleteStep
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getSteps
);

router.get(
  "/:stepId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.steps.read_step] }),
  param("stepId").exists(),
  validator,
  Controller.getStep
);
export default router;
