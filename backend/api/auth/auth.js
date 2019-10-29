const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/userModel');

function _onLogin(req, username, password, next) {
    if (!username) { 
        return next(null, null, {
            message: 'User is not found'
        });
    }
    UserModel.findOne()
}

// Login Passport
passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({
            username
        });
        if (!user) {
            //If the user isn't found in the database, return a message
            return done(null, false, {
                message: 'User not found'
            });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }
        //Send the user information to the next middleware
        return done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        return done(error);
    }
}));

// JWT Passport
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, function (err, token, done) {
    if (err) {
        return done(err, false);
    }
    if (token) {
        console.log("Token");
        return done(null, token.user);
    } else {
        console.log("No Token");
        return done(null, false);
    }
}));