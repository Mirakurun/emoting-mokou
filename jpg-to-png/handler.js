const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

module.exports.format = async (event) => {
  const records = event.Records;
  const keys = records.map((record) => {
    const body = JSON.parse(record.body);
    return decodeURIComponent(
      body.Records[0].s3.object.key.replace(/\+/g, ' ')
    );
  });

  try {
    // Fetch images
    console.log('Fetching images...');
    const images = await Promise.all(
      keys.map(async (key) => {
        const data = await s3
          .getObject({ Bucket: process.env.BUCKET, Key: key })
          .promise();

        const image = data;
        const filename = key.split('uploads/')[1];
        image.filename = filename;
        return Promise.resolve(image);
      })
    );
    // Format and upload images
    console.log('Formatting and uploading images...');

    const data = await Promise.all(
      images.map(async (image) => {
        const buffer = await sharp(image.Body).png().toBuffer();
        return s3
          .putObject({
            Body: buffer,
            Bucket: process.env.BUCKET,
            Key: `${process.env.KEYPREFIX}${
              image.filename.split('.jpg')[0]
            }.png`,
          })
          .promise();
      })
    );

    console.log('Uploaded images.');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: data,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
};
