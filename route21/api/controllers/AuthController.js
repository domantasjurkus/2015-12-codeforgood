var passport = require('passport-facebook');
var FacebookStrategy = require('passport-facebook').Strategy;

// Controller for authenticating with FB
module.exports = {

  auth: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
 
  },

  callback: function(req, res) {
    return res.send("Callback");
  }

};
