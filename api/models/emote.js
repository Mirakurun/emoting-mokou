const mongoose = require('mongoose');

const { Schema } = mongoose;

const emoteSchema = new Schema(
  {
    caption: { type: String, required: true },
    filename: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Emote', emoteSchema);
