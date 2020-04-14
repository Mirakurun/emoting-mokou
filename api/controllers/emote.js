const mongoose = require('mongoose');
const Emote = require('../models/emote');

exports.searchEmotes = async (req, res, next) => {
  const { query } = req.query;

  const aggregate = Emote.aggregate([
    {
      $searchBeta: {
        search: {
          path: ['caption', 'tags'],
          query,
        },
        highlight: {
          path: ['tags', 'caption'],
        },
      },
    },
    {
      $project: {
        caption: 1,
        filename: 1,
        tags: 1,
        createdAt: 1,
        _id: 0,
        id: '$_id',
        score: {
          $meta: 'searchScore',
        },
        highlight: {
          $meta: 'searchHighlights',
        },
      },
    },
  ]);

  try {
    const emotes = await aggregate.exec();

    res.status(200).json(emotes);
  } catch (error) {
    next(error);
  }
};

exports.sampleEmotes = async (req, res, next) => {
  const { index, size } = req.query;
  const { aggregated } = req.body;

  const aggregate = Emote.aggregate([
    { $sample: { size: +index * +size + +size } },
    {
      $match: {
        _id: { $nin: aggregated.map(val => mongoose.Types.ObjectId(val)) },
      },
    },
    { $limit: +size },
    {
      $project: {
        caption: 1,
        filename: 1,
        tags: 1,
        createdAt: 1,
        _id: 0,
        id: '$_id',
      },
    },
  ]);

  try {
    const emotes = await aggregate.exec();

    res.status(200).json(emotes);
  } catch (error) {
    next(error);
  }
};
