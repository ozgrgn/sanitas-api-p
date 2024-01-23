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
    requirePermissions: [PERMISSONS.translates.create_translate],
  }),
  body("lang").exists(),
  body([
    "lang",
    "homePage",
    "about",
    "treatments",
    "contact",
    "language",
    "allTreatments",
    "get_in_touch_with_us",
    "call_us_anytime",
    "mail_us",
    "book_an_appointment",
    "name",
    "phone",
    "mail",
    "send",
    "phone_required",
    "name_required",
    "email_required",
    "book",
    "address",
    "book_by_phone",
    "note",
    "subject",
    "faq",
    "faq1",
    "faq2",
    "review1",
    "review2",
    "group1",
    "group2",
    "about1",
    "about2",
    "form_header1",
    "form_header2",
    "form_button",
    "form_sent",
    "read_more",
    "posted_on",
    "health_tourism",
  ]).optional(),
  validator,
  Controller.addTranslate
);

router.put(
  "/:translateId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.translates.update_translate],
  }),
  param("translateId").exists(),
  body(["translate"]).exists(),
  validator,
  Controller.updateTranslate
);

router.delete(
  "/:translateId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.translates.delete_translate],
  }),
  param("translateId").exists(),
  validator,
  Controller.deleteTranslate
);
//warning adminRouteGuard
router.get(
  "/",
  query(["lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTranslates
);

router.get(
  "/:translateId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.translates.read_translate],
  }),
  param("translateId").exists(),
  validator,
  Controller.getTranslate
);
router.get(
  "/perma/:perma",
  param("perma").exists(),
  validator,
  Controller.getTranslateViaPerma
);

export default router;
