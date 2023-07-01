const AWS = require("aws-sdk");
const express = require("express");
const Emote = require("../models/emote");

const app = express();

if (app.get("env") === "development") {
  AWS.config.getCredentials((err) => {
    if (err) console.log(err.stack);
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
  });
}

AWS.config.update({ region: process.env.REGION });

const s3 = new AWS.S3();

exports.getProfile = async (req, res) => {
  const { user } = req;

  res.status(200).json(user);
};

exports.addEmote = async (req, res, next) => {
  const { caption, filename, tags } = req.body;

  try {
    console.log("Adding emote to database...");

    const emote = new Emote({
      caption,
      filename,
      tags,
    });

    const data = await emote.save();

    console.log("Added emote.");

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateEmote = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  try {
    console.log("Updating emote...");

    const emote = await Emote.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    console.log("Updated emote.");

    res.status(200).json(emote);
  } catch (error) {
    next(error);
  }
};

exports.createPresignedPost = (req, res, next) => {
  const { filename } = req.body;

  console.log("Creating pre-signed POST...");

  const params = {
    Bucket: process.env.BUCKET,
    Conditions: [["starts-with", "$key", `${process.env.KEYPREFIX}`]],
    Expires: 60,
    Fields: {
      key: `${process.env.KEYPREFIX}${filename}`,
    },
  };

  s3.createPresignedPost(params, (err, data) => {
    if (err) {
      next(err);
    } else {
      console.log("Created pre-signed POST.");

      res.status(200).json(data);
    }
  });
};
