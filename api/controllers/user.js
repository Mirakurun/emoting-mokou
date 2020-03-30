const Emote = require('../models/emote');

exports.getProfile = (req, res) => {
  const { user } = req;

  res.status(200).json(user);
};

exports.addToFavorites = async (req, res, next) => {
  const { emoteId } = req.body;

  try {
    const emote = await Emote.findById(emoteId);

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
  const { emoteId } = req.body;

  try {
    await req.user.removeFromFavorties(emoteId);

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
