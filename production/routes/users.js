const express = require("express");
const router  = express.Router();
const usersController = require('../controllers').users;
require("dotenv").config()

//passport JS configuation
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

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
       usersController.findOrCreate({firstName:profile._json.name.givenName, lastName:profile._json.name.familyName, image:profile._json.image.url, passportId:profile.id}).then((user) => {
        console.log('THIS LINE USER', user)
        return done(null, user);
       })

       //  , function (err, user) {
       //   return done(err, user);
       // });
  }
));

// For FACEBOOK

passport.use(new FacebookStrategy({
    clientID: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    callbackURL: "http://localhost:3001/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', "name", "email"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("Facebook Name: ", profile.displayName)
    console.log("Facebook ID: ", profile.id)
    console.log("image url: ", profile.photos[0].value)
    console.log("Done: ", done)
     usersController.findOrCreate({firstName:profile.name.givenName, lastName:profile.name.familyName, image:profile.photos[0].value, passportId:profile.id}, function (err, user) {
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
    passport.authenticate('google', { successRedirect: "http://localhost:3001/users/auth/facebook/callback",
                                      failureRedirect: '/login' }),
    function(req, res) {
      console.log("THIS IS THE SUCCESS CODE")
      res.redirect('http://localhost:3000');
    });

  // facebook
  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  router.get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['public_profile', 'user_photos']}));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));



  router.get("/", (req, res) => {
    // get info from redis client
    console.log('going')
    res.send('ok')
  });

    //Use quick/dirty estimate that 1m in y is ~0.00001 degre (of latitude) and 1m in x is 0.00001 in x
    //find friends within 100m
  router.get('/nearby/:lat/:lng/:id', (req, res) => {
    console.log(req.params)
    let latMin = Number(req.params.lat) -0.0001;
    let latMax = Number(req.params.lat) +0.0001;
    let lngMin = Number(req.params.lng) -0.0001;
    let lngMax = Number(req.params.lng) +0.0001;
    console.log('latmin', latMin)
    console.log('latmax', latMax)
    console.log('lngMin', lngMin)
    console.log('lngMax', lngMax)
    usersController.findUsersNearby({latMin, latMax, lngMin, lngMax, id:req.params.id}).then((users) => {
      console.log(users);
      res.send(users)
    })
  });

  router.get('/friends/:id', (req, res) => {
    usersController.findFriends().spread((results, metadata) => {
      res.send(results)
    })
  });

  return router;
}
