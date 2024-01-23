import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.faqs.create_faq],
  }),
  body(["lang"]).exists(),
  body([
    "question",
    "answer",
    "isActive",
    "general",
    "order",
    "treatment",
  ]).optional(),
  validator,
  Controller.addFaq
);

router.put(
  "/:faqId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.faqs.update_faq],
  }),
  param("faqId").exists(),
  body(["faq"]).exists(),
  validator,
  Controller.updateFaq
);

router.delete(
  "/:faqId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.faqs.delete_faq],
  }),
  param("faqId").exists(),
  validator,
  Controller.deleteFaq
);

router.get(
  "/",
  query(["isActive", "lang", "treatment","general"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getFaqs
);

router.get(
  "/:faqId",
  param("faqId").exists(),
  validator,
  Controller.getFaq
);
export default router;
