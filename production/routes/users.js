const express = require("express");
const router  = express.Router();
const usersController = require('../controllers').users;
require("dotenv").config()

const Users = require('../models').Users;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash    = require('connect-flash');

const cors = require('cors');


const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200,
  credentials: true
}
router.use(cors(corsOptions));

router.use(cookieParser());

router.use(flash()); // use connect-flash for flash messages stored in session

//passport JS configuation
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
        console.log('THIS LINE USER: =====> ', user)
        return done(null, user[0]);
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

     usersController.findOrCreate({firstName:profile.name.givenName, lastName:profile.name.familyName, image:profile.photos[0].value, passportId:profile.id}).then((user) => {
      console.log('THIS LINE USER: =====> ', user)
      return done(null, user[0]);
     })
   }
));


//sequealize will be passed in here.
// Passport session setup.
//
//   For persistent logins with sessions, Passport needs to serialize users into
//   and deserialize users out of the session. Typically, this is as simple as
//   storing the user ID when serializing, and finding the user by ID when
//   deserializing.
passport.serializeUser(function(user, done) {
  console.log("USER===>", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize user id ==>", id);
  Users.findById(id).then( function(user) {
    console.log("Users.findby ===> ", user);
    done(null, user);
  })
});

module.exports = () => {
  // Attempting to show the user information in the localhost 3000
  router.get('http://localhost:3000', (req, res) => {
    console.log("Get Root Request is succeeded!!!!!")
    console.log("Session Id ===> ", connect.sid)
    // res.send(user[0])
  })

  router.use(session({
    secret: 'keyboard'
  }));
  // INITIALIZE PASSPORT got the example from https://github.com/barberboy/passport-google-oauth2-example/blob/master/app.js
  router.use(passport.initialize());
  router.use(passport.session());




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
    passport.authenticate('google', { successRedirect: "http://localhost:3000",
                                      failureRedirect: '/login' }),
    function(req, res) {
      console.log("THIS IS THE SUCCESS CODE")
      req.session.save(function() {
        res.redirect('http://localhost:3000');
      })
      // res.redirect('http://localhost:3000');
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
    passport.authenticate('facebook', { successRedirect: "http://localhost:3000",
                                        failureRedirect: '/login' }),
          function(req, res) {
            console.log("THIS IS THE SUCCESS CODE")
            req.session.save(function() {
              res.redirect('http://localhost:3000');
            })
            // res.redirect('http://localhost:3000');
          }
            );



  router.get("/", (req, res) => {
    // get info from redis client
    // fetch("http://localhost:3001/users", {credentials: 'include', mode: 'cors', 'Access-Control-Allow-Credentials': true }).then((req) => console.log(req))
    console.log('req.user==>', req.user)
    res.send(req.user);
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect("http://localhost:3000");
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
  })

  return router;
}
