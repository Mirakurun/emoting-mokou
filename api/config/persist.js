const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('Serializing user...');
    console.log(user.id);
    done(null, user.id);
  });

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
};
