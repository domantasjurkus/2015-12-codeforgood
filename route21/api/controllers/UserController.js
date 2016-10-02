/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help    :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  facebook: function (req, res, next) {

    console.log("Test");
    

    passport.authenticate('facebook', { scope: ['email', 'public_profile']},
       function (err, user) {
         console.log(err, user);

          //  req.logIn(user, function (err) {
          //  if(err) {
          //      req.session.flash = 'There was an error';
          //      req.redirect('user/login');
          //  } else {
          //      req.session.user = user;
          //      req.redirect('/user/dashboard');
          //  }
          //  });
   })(req, res, next);
  },

  callback: function (req, res, next) {
    console.log('user/callback');
    passport.authenticate('facebook', {successRedirect: '/', failureRedirect: 'user/fail'})(req, res, next);
	},


  fail: function(req, res) {
    res.send('Fail');
  }
};
