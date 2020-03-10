const passport = require('passport');
const { Firestore } = require('@google-cloud/firestore');
const express = require('express');
const session = require('express-session');

const app = express();
const { FirestoreStore } = require('@google-cloud/connect-firestore');

const persist = require('./config/persist');
const authRouter = require('./routes/auth');
const twitterRouter = require('./routes/twitter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new FirestoreStore({
      dataset: new Firestore({
        kind: 'express-sessions',
      }),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

persist();

app.use(passport.initialize());
app.use(passport.session());

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
