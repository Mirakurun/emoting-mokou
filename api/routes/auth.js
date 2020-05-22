const express = require('express');
const passportTwitter = require('../config/passport');
const authController = require('../controllers/auth');

const app = express();
const router = express.Router();

router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    if (app.get('env') === 'production') {
      return res.redirect(process.env.HOST);
    }
    return res.redirect(`http://localhost:${process.env.CLIENT_PORT}`);
  }
);

router.get('/logout', authController.logout);

module.exports = router;
