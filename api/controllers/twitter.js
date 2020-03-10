const { twitter } = require('../services/twitter');

exports.tweet = async (req, res, next) => {
  const client = twitter(req);

  console.log(client);
  try {
    const tweet = await client.post('statuses/update', {
      status: 'hello world!',
    });

    res.status(200).send(tweet);
  } catch (error) {
    next(error);
  }
};
