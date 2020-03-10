const Twitter = require('twitter-lite');

module.exports.twitter = req => {
  const { token, tokenSecret } = req.user;
  return new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret,
  });
};
