const mime = require("mime-types");
const { twitter } = require("../services/twitter");

exports.tweet = async (req, res, next) => {
  const client = twitter({ req });
  const { files } = req;
  const { text } = req.body;

  try {
    console.log("Uploading media...");
    const promises = files.map((file) => {
      return client.v1.uploadMedia(file.buffer, {
        mimeType: mime.lookup(file.originalname),
      });
    });

    const mediaIds = await Promise.all(promises);
    console.log("Uploading media done.");

    console.log("Sending tweet...");
    const tweet = await client.v2.tweet(text, {
      media: {
        media_ids: mediaIds,
      },
    });

    console.log("Tweet sent.");

    await req.user.clearMedia();

    console.log("Cleared emotes.");

    const { expanded_url: url } = tweet.entities.urls;

    res.status(200).send(url);
  } catch (error) {
    next(error);
  }
};
