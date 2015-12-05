/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('http');
var request = require('request');

module.exports = {

  // Insert new data through a provided API URL
  insert: function(req, res) {
    var url = req.param('url');

    // Request to the API
    console.log("Making request");
    request(url, function(error, response, json) {
      // If request succeeded
      if (!error && response.statusCode == 200) {

        var opp = JSON.parse(json).results.collection1;

        return res.send(opp)
      }
    });
  },

	find: function(req, res) {
		res.send('Found something');
	}

};
