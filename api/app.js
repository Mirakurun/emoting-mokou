const passport = require('passport');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const store = require('./db/store');
require('./config/passport');

const app = express();

app.use(helmet());

const authRouter = require('./routes/auth');
const twitterRouter = require('./routes/twitter');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const emoteRouter = require('./routes/emote');

const corsOptions = {
  origin:
    app.get('env') === 'production'
      ? process.env.HOST
      : `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
};

app.use(cors(corsOptions)); // CORS for all routes
app.use(express.json()); // for parsing application/json

// use the session middleware
app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'emoting_mokou_sid',
    cookie: { secure: app.get('env') === 'production' },
    maxAge: 432000000, // 5 days
    sameSite: 'none',
  })
);

app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // persistent login sessions

// routes
app.use('/api/auth', authRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/emote', emoteRouter);

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { message, data, errors } = error;
  const status = error.statusCode || 500;
  res.status(status).json({ message, data, twitter_api_error: errors });
});

module.exports = app;
