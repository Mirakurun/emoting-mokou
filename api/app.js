const passport = require('passport');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const store = new MongoDBStore({
  uri: process.env.DB_URI,
  databaseName: process.env.DB_NAME,
  collection: 'sessions',
});

// catch errors
store.on('error', error => {
  console.error(error);
});

const persist = require('./config/persist');
const authRouter = require('./routes/auth');
const twitterRouter = require('./routes/twitter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

if (app.get('env') === 'production') {
  session.cookie.secure = true;
}

persist();

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/auth', authRouter);
app.use('/api/twitter', twitterRouter);

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { message, data, errors } = error;
  const status = error.statusCode || 500;
  res.status(status).json({ message, data, twitter_api_error: errors });
});

module.exports = app;
