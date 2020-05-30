const mongoose = require('mongoose');

const { Schema } = mongoose;

const emoteSchema = new Schema(
  {
    caption: { type: String, default: '' },
    filename: { type: String, required: true },
    series: [{ type: Schema.Types.ObjectId, ref: 'Emote' }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Emote', emoteSchema);
