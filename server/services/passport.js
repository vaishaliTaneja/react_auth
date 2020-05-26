const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//we did not require the user .js file as we would require this at many other js files 
//so mongoose will think we need to create multiple model of users
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    //new users({googleId: profile.id}); // just created a model instance
    //new User({googleId: profile.id}).save(); // now saved
    console.log('profile', profile.id);
    User.findOne({goodleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser); // (error, sucess)
                //we already have a record with given profile ID
            } else {
                new User({googleId: profile.id})
                    .save().then(user => done(null, user));
            }
        });
}));