const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// session store
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  databaseName: process.env.DB_NAME,
  collection: 'sessions',
});

// catch errors
store.on('error', error => {
  console.error(error);
});

module.exports = store;
