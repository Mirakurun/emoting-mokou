const express = require('express');
const isAuth = require('../middleware/is-auth');
const twitterController = require('../controllers/twitter');

const router = express.Router();

router.get('/tweet', isAuth, twitterController.tweet);

router.get('/upload', isAuth, twitterController.upload);

module.exports = router;
