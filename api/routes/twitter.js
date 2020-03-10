const express = require('express');
const auth = require('../middleware/auth');
const twitterController = require('../controllers/twitter');

const router = express.Router();

router.get('/tweet', auth, twitterController.tweet);

module.exports = router;
