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

    // The URL of the API
    var url = req.param('url');
    // Type of the event we want to scarpe
    var type = req.param('type');

    // Request to the API
    console.log("Making request");
    request(url, function(error, response, json) {
      
      // If request is successful
      if (!error && response.statusCode == 200) {

        var opp = JSON.parse(json).results.collection1;

        // Loop through each opportunity
        opp.forEach(function(oppor) {
          var title   = oppor.title;
          var link    = oppor.link;
          var company = oppor.company;
          var tags    = oppor.title.toLowerCase().replace(/[\[\](){}?*+\^$\\.,&|\-]/g, '').replace('  ', ' ').split(" ");


          // If the opportunity is of requested type
          if (_.contains(tags, type)){

            // Create a new Item instance
            Item.findOrCreate({
              title: title,
              category: type,
              link: link,
              company: company,
              tags: tags

            // Persist the Item to the DB
            }).exec(function(err, item) {
              if (err) {
                console.log(err);
              }
              console.log("---Create a "+type+" item.---");
              console.log(title+"\n"+link+"\n"+tags+"\n");
            });
          }

        });

        return res.send("Request finished")
      }
    });
  },

	find: function(req, res) {
		res.send('Found something');
	}

};
