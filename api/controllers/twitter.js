const { twitter } = require('../services/twitter');

exports.tweet = async (req, res, next) => {
  const client = twitter({ req });
  const uploadClient = twitter({ req, subdomain: 'upload' });
  const { files } = req;
  const { text } = req.body;

  try {
    const promises = files.map(file => {
      return uploadClient.post('media/upload', {
        media_data: file.buffer.toString('base64'),
      });
    });

    const responses = await Promise.all(promises);

    const medias = responses.map(response => {
      return response.media_id_string;
    });

    const tweet = await client.post('tweets', {
      status: text,
      media_ids: medias.join(),
    });

    console.log('Tweet sent.');

    await req.user.clearMedia();

    console.log('Cleared emotes.');

    const { url } = tweet.entities.media[0];

    res.status(200).send(url);
  } catch (error) {
    next(error);
  }
};
