const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/profile', isAuth, userController.getProfile);

router.get('/favorites', isAuth, userController.getFavorites);

router.get('/populate-favorites', isAuth, userController.populateFavorites);

router.post(
  '/media',
  isAuth,
  [
    body('id')
      .exists()
      .isString()
      .trim(),
  ],
  userController.addToMedia
);

router.post(
  '/favorites',
  isAuth,
  [
    body('id')
      .exists()
      .isString()
      .trim(),
  ],
  userController.addToFavorites
);

router.delete('/media/:index', isAuth, userController.removeFromMedia);

router.delete('/favorites/:id', isAuth, userController.removeFromFavorites);

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
