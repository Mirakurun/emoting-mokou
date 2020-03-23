const express = require('express');
const { body } = require('express-validator');
const isAdmin = require('../middleware/is-admin');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post(
  '/emote',
  isAdmin,
  [
    body('description')
      .exists()
      .isString()
      .isLength({ min: 1 })
      .trim(),
    body('filename')
      .exists()
      .isString()
      .isLength({ min: 1 })
      .trim(),
    body('tags')
      .exists()
      .isArray(),
    body('tags.*')
      .isString()
      .isLength({ min: 1 })
      .trim(),
  ],
  adminController.addEmote
);

router.put(
  '/emote/:id',
  isAdmin,
  [
    body('description')
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim(),
    body('filename')
      .optional()
      .isString()
      .isLength({ min: 1 })
      .trim(),
    body('tags')
      .optional()
      .isArray(),
    body('tags.*')
      .isString()
      .isLength({ min: 1 })
      .trim(),
  ],
  adminController.updateEmote
);

router.post(
  '/createpresignedpost',
  isAdmin,
  [
    body('filename')
      .exists()
      .isString()
      .isLength({ min: 1 })
      .trim(),
  ],
  adminController.createPresignedPost
);

module.exports = router;
