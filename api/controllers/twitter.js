const fs = require('fs').promises;
const path = require('path');
const { twitter } = require('../services/twitter');

exports.tweet = async (req, res, next) => {
  const client = twitter({ req });

  try {
    const tweet = await client.post('statuses/update', {
      status: 'hello world!',
    });

    res.status(200).send(tweet);
  } catch (error) {
    next(error);
  }
};

exports.upload = async (req, res, next) => {
  const client = twitter({ req });
  const uploadClient = twitter({ req, subdomain: 'upload' });
  const filepath = path.join(__dirname, '../emotes/mokou-chair.jpg');

  try {
    const data = await fs.readFile(filepath, { encoding: 'base64' });
    const media = await uploadClient.post('media/upload', { media_data: data });
    const tweet = await client.post('statuses/update', {
      status: '',
      media_ids: [media.media_id_string],
    });

    res.status(200).send(tweet);
  } catch (error) {
    next(error);
  }
};
