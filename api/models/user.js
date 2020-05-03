const mongoose = require('mongoose');

const { Schema } = mongoose;

function arrayLimit(val) {
  return val.length <= 4;
}

const userSchema = new Schema(
  {
    darkMode: { type: Boolean, default: false },
    displayName: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Emote' }],
    media: {
      type: [{ type: String }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 4!'],
    },
    profileBanner: { type: String, required: true },
    profileImage: { type: String, required: true },
    provider: { type: String, required: true },
    role: { type: String, default: 'user' },
    token: { type: String },
    tokenSecret: { type: String },
    uid: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.addToMedia = function(emote) {
  const { filename } = emote;

  if (!this.media.includes(filename)) {
    this.media.push(filename);
  }

  return this.save();
};

userSchema.methods.removeFromMedia = function(index) {
  if (index > -1) {
    this.media.splice(index, 1);
    return this.save();
  }

  return Promise.reject(new Error('Emote not found!'));
};

userSchema.methods.clearMedia = function() {
  this.media = [];
  return this.save();
};

userSchema.methods.addToFavorites = function(emote) {
  const { _id: id } = emote;

  if (!this.favorites.includes(id)) {
    this.favorites.push(id);
  }

  return this.save();
};

userSchema.methods.removeFromFavorites = function(id) {
  const index = this.favorites.indexOf(id);

  if (index > -1) {
    this.favorites.splice(index, 1);
    return this.save();
  }

  return Promise.reject(new Error('Favorite not found!'));
};

userSchema.methods.toggleDarkMode = function(bool) {
  this.darkMode = bool;

  return this.save();
};

module.exports = mongoose.model('User', userSchema);
