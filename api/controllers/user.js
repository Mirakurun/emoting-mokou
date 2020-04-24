const Emote = require('../models/emote');
const User = require('../models/user');

exports.getProfile = (req, res) => {
  const { user } = req;

  res.status(200).json(user);
};

exports.getFavorites = (req, res) => {
  const { user } = req;

  res.status(200).json(user.favorites);
};

exports.populateFavorites = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).populate('favorites');

    const favorites = user.favorites.map(favorite => {
      const { _id: renameId, caption, filename, tags } = favorite;
      const data = {};

      data.id = renameId;
      data.caption = caption;
      data.filename = filename;
      data.tags = tags;

      return data;
    });

    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

exports.addToFavorites = async (req, res, next) => {
  const { id } = req.body;

  try {
    const emote = await Emote.findById(id);

    if (!emote) {
      res.status(422).json({ message: 'Emote not found.' });
    }

    await req.user.addToFavorites(emote);

    console.log('Added emote to favorites.');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  const { id } = req.params;

  try {
    await req.user.removeFromFavorites(id);

    console.log('Removed emote from favorite.');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.toggleDarkMode = async (req, res, next) => {
  const { darkmode } = req.body;

  try {
    const { darkMode } = await req.user.toggleDarkMode(darkmode);

    console.log('Toggled dark mode.');

    res.status(200).json({ darkMode });
  } catch (error) {
    next(error);
  }
};
