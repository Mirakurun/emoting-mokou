const serverless = require('serverless-http');
require('./db/mongoose');
const app = require('./app');

module.exports.handler = serverless(app);
