const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  displayName: { type: String, required: true },
  photos: [{ value: { type: String, required: true } }],
  provider: { type: String, required: true },
  token: { type: String },
  tokenSecret: { type: String },
  uid: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
