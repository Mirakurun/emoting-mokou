const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const db = require('../db/firestore');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: '/api/auth/twitter/callback',
      passReqToCallback: true,
    },
    async (req, token, tokenSecret, profile, done) => {
      console.log('Finding user...');
      // find user in database
      const usersRef = db.collection('users');

      try {
        const querySnapshot = await usersRef
          .where('uid', '==', profile.id)
          .get();

        if (!req.user) {
          // user not logged-in
          console.log('User not logged-in.');
          if (querySnapshot.empty) {
            // create new user
            console.log('User not found.');
            console.log('Creating new user...');
            const data = {};
            data.displayName = profile.displayName;
            data.uid = profile.id;
            data.photos = profile.photos;
            data.provider = profile.provider;
            data.username = profile.username;
            data.token = token;
            data.tokenSecret = tokenSecret;

            const docRef = await usersRef.add(data);
            console.log('Created new user.');
            return done(null, docRef);
          }

          return querySnapshot.forEach(docSnapshot => {
            if (docSnapshot.exists) {
              // user exists
              console.log('Found user.');
              done(null, docSnapshot);
            }
          });
        }
        // user exists and is logged-in
        const { user } = req;

        return querySnapshot.forEach(async docSnapshot => {
          const docRef = db.doc(`users/${docSnapshot.id}`);

          user.displayName = profile.displayName;
          user.uid = profile.id;
          user.photos = profile.photos;
          user.provider = profile.provider;
          user.username = profile.username;
          user.token = token;
          user.tokenSecret = tokenSecret;

          await docRef.set(user, { merge: true });
          return done(null, docSnapshot);
        });
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
