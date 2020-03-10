const express = require('express');
const passportTwitter = require('../config/strategy');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passportTwitter.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout', authController.logout);

module.exports = router;
