const mongoose = require('mongoose');
const Emote = require('../models/emote');

exports.getEmote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const emote = await Emote.findById(id);

    if (!emote) {
      const error = new Error('Emote not found!');
      error.statusCode = 404;
      throw error;
    }

    console.log('Found emote.');

    const { _id: renameId, caption, createdAt, filename, tags } = emote;
    const result = {};

    result.id = renameId;
    result.caption = caption;
    result.createdAt = createdAt;
    result.filename = filename;
    result.tags = tags;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

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
