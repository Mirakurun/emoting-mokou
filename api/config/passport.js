const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');

// serialize user instance
passport.serializeUser((user, done) => {
  console.log('Serializing user...');
  console.log(user.id);
  done(null, user.id);
});

// deserialize user instance
passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user...');
  console.log(id);

  try {
    const user = await User.findById(id);

    if (!user) {
      return done(new Error('Document not found!'));
    }

    console.log('Deserialized user.');

    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error);
  }
});

// twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: '/api/auth/twitter/callback',
      passReqToCallback: true,
    },
    async (req, token, tokenSecret, profile, done) => {
      console.log(profile);
      const { displayName, id: uid, photos, provider, username } = profile;
      console.log('Finding user...');

      try {
        if (!req.user) {
          // user not logged-in
          console.log('User not logged-in.');
          const user = await User.findOne({ uid: profile.id });

          if (!user) {
            // create new user
            console.log('User not found.');
            console.log('Creating new user...');
            const newUser = new User({
              displayName,
              uid,
              photos,
              provider,
              token,
              tokenSecret,
              username,
            });

            const result = await newUser.save();
            console.log('Created new user.');

            return done(null, result);
          }
          // user exists
          console.log('Found user.');
          return done(null, user);
        }
        // user exists and is logged-in
        const { user } = req;

        user.displayName = displayName;
        user.uid = uid;
        user.photos = photos;
        user.provider = provider;
        user.username = username;
        user.token = token;
        user.tokenSecret = tokenSecret;

        const result = await user.save();
        console.log('User updated.');

        return done(null, result);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
