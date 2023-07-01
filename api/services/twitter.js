const { TwitterApi } = require("twitter-api-v2");

exports.twitter = ({ req }) => {
  const { token, tokenSecret } = req.user;
  return new TwitterApi({
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: token,
    accessSecret: tokenSecret,
  });
};
