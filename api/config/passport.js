const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const express = require("express");
const User = require("../models/user");

const app = express();

// serialize user instance
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user instance
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(new Error("Document not found!"));
    }

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
      callbackURL:
        app.get("env") === "production"
          ? `${process.env.HOST}/api/auth/twitter/callback`
          : `http://localhost:${process.env.PORT}/api/auth/twitter/callback`,
      passReqToCallback: true,
    },
    async (req, token, tokenSecret, profile, done) => {
      const { displayName, id: uid, provider, _json: json, username } = profile;
      console.log("Finding user...");

      try {
        if (!req.user) {
          // user not logged-in
          console.log("User not logged-in.");
          const user = await User.findOne({ uid: profile.id });

          if (!user) {
            // create new user
            console.log("User not found.");
            console.log("Creating new user...");
            const newUser = new User({
              displayName,
              uid,
              profileBanner: json.profile_banner_url,
              profileImage: json.profile_image_url_https,
              provider,
              token,
              tokenSecret,
              username,
            });

            const result = await newUser.save();
            console.log("Created new user.");

            return done(null, result);
          }
          // user exists
          console.log("Found user.");

          user.displayName = displayName;
          user.uid = uid;
          user.profileBanner = json.profile_banner_url;
          user.profileImage = json.profile_image_url_https;
          user.provider = provider;
          user.username = username;
          user.token = token;
          user.tokenSecret = tokenSecret;

          const result = await user.save();

          return done(null, result);
        }
        // user exists and is logged-in
        const { user } = req;

        user.displayName = displayName;
        user.uid = uid;
        user.profileBanner = json.profile_banner_url;
        user.profileImage = json.profile_image_url_https;
        user.provider = provider;
        user.username = username;
        user.token = token;
        user.tokenSecret = tokenSecret;

        const result = await user.save();
        console.log("User updated.");

        return done(null, result);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
