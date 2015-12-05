/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help    :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  facebook: function (req, res, next) {
     passport.authenticate('facebook', { scope: ['email', 'public_profile']},
       function(req, res){
         console.log('user/facebook', res);
         // The request will be redirected to Facebook for authentication, so this
         // function will not be called.
       });
	  },

  callback: function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login' },
    function(req, res) {
      console.log('user/callback');
      // Successful authentication, redirect home.
      res.redirect('/');
    });
	},

};
