const { twitter, twitterV2 } = require('../services/twitter');

exports.tweet = async (req, res, next) => {
  const client = twitterV2({ req });
  const uploadClient = twitter({ req, subdomain: 'upload' });
  const { files } = req;
  const { text } = req.body;

  try {
    console.log("Uploading media...");
    const promises = files.map(file => {
      return uploadClient.post('media/upload', {
        media_data: file.buffer.toString('base64'),
      });
    });

    const responses = await Promise.all(promises);
    console.log("Uploading media done.");

    const medias = responses.map(response => {
      return response.media_id_string;
    });

    console.log("Sending tweet...");
    const tweet = await client.post('tweets', {
      text,
      media: {
        media_ids: medias.join()
      },
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
