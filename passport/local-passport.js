// config/passport.js

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var models = require("../models/index");
var User = models.User;

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({
          where: {
            email,
            password
          }
        })
          .then(user => {
            if (!user) {
              return cb(null, false, {
                message: "Incorrect email or password."
              });
            }
            return cb(null, user, {
              message: "Logged In Successfully"
            });
          })
          .catch(err => {
            console.log(err);
            cb(err);
          });
      }
    )
  );

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      async function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        let user;
        try {
          user = await User.findOne({
            where: {
              email: email
            }
          });
          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, {
              message: "That email is already taken."
            });
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            const userType = req.body.userType;
            // set the user's local credentials
            newUser.email = email;
            newUser.password = password;
            newUser.user_type = userType;
            // save the user
            try {
              await newUser.save();
              return done(null, newUser, {
                message: "Registered Successfully"
              });
            } catch (err) {
              throw err;
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
