/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help    :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  'facebook': function (req, res, next) {
	   passport.authenticate('facebook', { scope: ['email']},
	    function (err, user) {
	      req.logIn(user, function (err) {
	      if(err) {
	        req.session.flash = 'There was an error';
	        res.redirect('user/login');
	      } else {
	        req.session.user = user;
	        res.redirect('/user/dashboard');
	      }
	    });
	  })(req, res, next);
	  },

  'facebook/callback': function (req, res, next) {
	   passport.authenticate('facebook',
	    function (req, res) {
	      res.redirect('/user/dashboard');
	    })(req, res, next);
	},

};
