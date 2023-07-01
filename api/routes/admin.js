const express = require("express");
const { body } = require("express-validator");
const isAdmin = require("../middleware/is-admin");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/profile", isAdmin, adminController.getProfile);

router.post(
  "/emote",
  isAdmin,
  [
    body("caption").exists().isString().trim(),
    body("filename").exists().isString().isLength({ min: 1 }).trim(),
    body("series").optional().isArray(),
    body("series.*").isString().isLength({ min: 1 }).trim(),
    body("tags").exists().isArray(),
    body("tags.*").isString().isLength({ min: 1 }).trim(),
  ],
  adminController.addEmote
);

router.put(
  "/emote/:id",
  isAdmin,
  [
    body("caption").optional().isString().trim(),
    body("filename").optional().isString().isLength({ min: 1 }).trim(),
    body("series").optional().isArray(),
    body("series.*").isString().isLength({ min: 1 }).trim(),
    body("tags").optional().isArray(),
    body("tags.*").isString().isLength({ min: 1 }).trim(),
  ],
  adminController.updateEmote
);

router.post(
  "/createpresignedpost",
  isAdmin,
  [body("filename").exists().isString().isLength({ min: 1 }).trim()],
  adminController.createPresignedPost
);

module.exports = router;
