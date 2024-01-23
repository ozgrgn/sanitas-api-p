import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.healths.create_health] }),
  body(["lang"]).exists(),
  body([
    "health_spot",
    "health_title",
    "health_left",
    "health_right",
    "health_subTitle1",
    "health_subTitle2",
    "images",
    "logos",
  ]).optional(),
  validator,
  Controller.addHealth
);

router.put(
  "/:healthId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.healths.update_health] }),
  param("healthId").exists(),
  body(["health"]).exists(),
  validator,
  Controller.updateHealth
);

router.delete(
  "/:healthId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.healths.delete_health] }),
  param("healthId").exists(),
  validator,
  Controller.deleteHealth
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getHealths
);

router.get(
  "/:healthId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.healths.read_health] }),
  param("healthId").exists(),
  validator,
  Controller.getHealth
);
export default router;
