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
      return res.redirect('/');
    }
    return res.redirect(process.env.LOCALHOST);
  }
);

router.get('/logout', authController.logout);

module.exports = router;
