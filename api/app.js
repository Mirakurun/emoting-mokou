const passport = require('passport');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('./config/passport');

const app = express();

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

const authRouter = require('./routes/auth');
const twitterRouter = require('./routes/twitter');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions)); // CORS for all routes
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use the session middleware
app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'emoting_mokou_sid',
  })
);

// if environment is production, serve secure cookies
if (app.get('env') === 'production') {
  session.cookie.secure = true;
}

app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // persistent login sessions

// routes
app.use('/api/auth', authRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { message, data, errors } = error;
  const status = error.statusCode || 500;
  res.status(status).json({ message, data, twitter_api_error: errors });
});

module.exports = app;
