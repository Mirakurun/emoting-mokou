const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/profile', isAuth, userController.getProfile);

router.post(
  '/favorites',
  isAuth,
  [
    body('emoteId')
      .exists()
      .isString()
      .trim(),
  ],
  userController.addToFavorites
);

router.delete(
  '/favorites',
  isAuth,
  [
    body('emoteId')
      .exists()
      .isString()
      .trim(),
  ],
  userController.removeFromFavorites
);

router.post(
  '/darkmode',
  isAuth,
  [
    body('darkmode')
      .exists()
      .isBoolean(),
  ],
  userController.toggleDarkMode
);

module.exports = router;
