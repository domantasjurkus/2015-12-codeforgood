var passport = require('passport-facebook');
var FacebookStrategy = require('passport-facebook').Strategy;

// Controller for authenticating with FB
module.exports = {
  
  auth: function(req, res) {

    passport.use(new FacebookStrategy({
        clientID: 1694746604094531,
        clientSecret: "47f295c2e4cf88e5c352ef315017a0a0",
        callbackURL: "http://localhost:1337/auth/callback",
        enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

    return res.send('this is new');
  },

  callback: function(req, res) {
    return res.send("Callback");
  }

};


