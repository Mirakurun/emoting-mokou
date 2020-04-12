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
  const { size = '20' } = req.query;

  const aggregate = Emote.aggregate([
    { $sample: { size: +size } },
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
