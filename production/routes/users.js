const express = require("express");
const router  = express.Router();
const usersController = require('../controllers').users;
require("dotenv").config()

//passport JS configuation
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3001/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       usersController.create({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

//sequealize will be passed in
module.exports = () => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("req")
      res.redirect('/');
    });

  router.get("/", (req, res) => {
    // get info from redis client
    console.log('going')
    res.send('ok')
  }),

  router.post('/', usersController.create)

  return router;
}
