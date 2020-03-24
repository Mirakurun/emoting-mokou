const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Emote' }],
    photos: [{ value: { type: String, required: true } }],
    provider: { type: String, required: true },
    role: { type: String, default: 'user' },
    token: { type: String },
    tokenSecret: { type: String },
    uid: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.addToFavorites = function(emote) {
  const { _id: id } = emote;

  if (!this.favorites.includes(id)) {
    this.favorites.push(id);
  }

  return this.save();
};

userSchema.methods.removeFromFavorites = function(emote) {
  const { _id: id } = emote;

  const index = this.favorites.indexOf(id);

  if (index > -1) {
    this.favorites(index, 1);
    return this.save();
  }

  return Promise.reject(new Error('Favorite not found!'));
};

module.exports = mongoose.model('User', userSchema);
