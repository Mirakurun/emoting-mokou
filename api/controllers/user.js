const Emote = require("../models/emote");
const User = require("../models/user");

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
    const user = await User.findById(id).populate("favorites");

    const favorites = user.favorites.map((emote) => {
      const { _id: renameId, caption, filename, tags } = emote;
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

exports.addToMedia = async (req, res, next) => {
  const { id } = req.body;

  try {
    const emote = await Emote.findById(id);

    if (!emote) {
      res.status(422).json({ message: "Emote not found." });
    }

    await req.user.addToMedia(emote);

    console.log("Added emote to media.");

    res.status(201).send(emote.filename);
  } catch (error) {
    next(error);
  }
};

exports.removeFromMedia = async (req, res, next) => {
  const { index } = req.params;

  try {
    await req.user.removeFromMedia(index);

    console.log("Removed emote from draft.");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.addToFavorites = async (req, res, next) => {
  const { id } = req.body;

  try {
    const emote = await Emote.findById(id);

    if (!emote) {
      res.status(422).json({ message: "Emote not found." });
    }

    await req.user.addToFavorites(emote);

    console.log("Added emote to favorites.");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  const { id } = req.params;

  try {
    await req.user.removeFromFavorites(id);

    console.log("Removed emote from favorite.");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.toggleDarkMode = async (req, res, next) => {
  const { darkmode } = req.body;

  try {
    const { darkMode } = await req.user.toggleDarkMode(darkmode);

    console.log("Toggled dark mode.");

    res.status(200).json({ darkMode });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findByIdAndDelete(id);

    console.log(`Deleted user: ${user.username}`);

    req.session.destroy((error) => {
      if (error) {
        next(error);
      }
      res.clearCookie("emoting_mokou_sid");
      return res.status(204).send();
    });
  } catch (error) {
    next(error);
  }
};
