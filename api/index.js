const serverless = require('serverless-http');
const { mongoose } = require('./db/mongoose');
const app = require('./app');

module.exports.handler = serverless(app);
