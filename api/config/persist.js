const passport = require('passport');
const db = require('../db/firestore');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('Serializing user...');
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user...');
    console.log(id);
    const usersRef = db.collection('users');
    const docRef = usersRef.doc(id);

    try {
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        console.log('Deserialized user.');
        const data = docSnapshot.data();
        return done(null, data);
      }

      return done(new Error('Document not found!'));
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });
};
