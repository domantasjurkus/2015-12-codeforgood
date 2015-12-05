/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('http');
var request = require('request');
var _ = require('underscore');

module.exports = {

  // Insert new data through a provided API URL
  insert: function(req, res) {
    var url = req.param('url');
    // Type of the events we want to scarpe
    var type = req.param('type');

    var eventType = [
      'event',
      'internship',
      'job',
      'advice',
      'other',
    ]

    // Request to the API
    console.log("Making request");
    request(url, function(error, response, json) {
      
      // If request is successful
      if (!error && response.statusCode == 200) {

        var opp = JSON.parse(json).results.collection1;

        // collection1 is an array of objects
        var keyname

        // Loop through each opportunity
        opp.forEach(function(oppor) {
          var title = oppor.title.text;
          var link = oppor.title.href;
          var tags = oppor.title.text.toLowerCase().replace(/[\[\](){}?*+\^$\\.,&|\-]/g, "").split(" ");

          // If the opportunity is of requested type
          if (_.contains(tags, type)){
            Item.create({
              category: type,
              title: title,
              link: link,
              tags: tags
            }).exec(function() {
              console.log("---Create a "+type+" item.---");
              console.log(title+"\n"+link+"\n"+tags+"\n\n");
            });
          }

        });

        return res.send(opp)
      }
    });
  },

	find: function(req, res) {
		res.send('Found something');
	}

};
