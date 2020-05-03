const express = require('express');
const multer = require('multer');
const isAuth = require('../middleware/is-auth');
const twitterController = require('../controllers/twitter');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ fileFilter });

const router = express.Router();

router.post(
  '/tweet',
  isAuth,
  upload.array('images', 4),
  twitterController.tweet
);

module.exports = router;
