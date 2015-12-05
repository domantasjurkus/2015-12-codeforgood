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
          console.log("Entry");
          var title   = oppor.title;
          var link    = oppor.link;
          var company = oppor.company;
          var location= oppor.location || '-';
          var tags    = oppor.title.toLowerCase().replace(/[\[\](){}?*+\^$\\.,&|\-]/g, '').replace('  ', ' ').split(" ");

          // Create a new Item instance
          Item.findOrCreate({
            title: title,
            category: type,
            link: link,
            company: company,
            location: location,
            tags: tags

          // Persist the Item to the DB
          }).exec(function(err, item) {
            if (err) {
              console.log(err);
            }
            console.log("---Create a "+type+" item.---");
            console.log(title+"\n"+link+"\n"+tags+"\n");
          });

        });

        return res.send("Request finished")
      }
    });
  },

	find: function(req, res) {

    var skillsFilter;
    if (req.param('search')) {
      skillsFilter = req.param('search').split(' ');
    } else {
      var paramSkills = req.param('skills');
      skillsFilter = paramSkills ? paramSkills : "";
      skillsFilter = skillsFilter.split('-');
    }

    console.log('skills:', skillsFilter);

    skills = skillsFilter.map(function(skill) {
      return {tags: { contains: [skill]}}
    });

    var filter = req.param('filter') ? req.param('filter') : '';
    filterByCategories = filter.split('-').map(function(filter) {
      return {category: filter};
    });

    var q = {};
    // if (req.param('filter'))
    //   q.or = filterByCategories;
    if (req.param('skills') || req.param('search')) {
      q.where = {or: skills};
    }

    console.log(q);

    Item.find()
    .where(q)
    .paginate({page: req.param('page'), limit: req.param('limit')})
    .sort('title ASC')
    .then(function(items) {

      console.log('found items: ', items.length, req.param('search'));
      if (items.length || req.param('search')) {
        return items;
      }
      return Item.find()
      .paginate({page: req.param('page'), limit: req.param('limit')});
    })
    .then(function(items) {

      if (req.param('filter')) { 
        items = items.filter(function(item) {
          return req.param('filter').split('-').indexOf(item.category) > -1;
        });
      }

      return res.view('feed-page', {items,
        search: req.param('search'),
        skills: req.param('skills'),
        limit: req.param('limit'),
        page: req.param('page'),
        filter: req.param('filter'),
      });
    });

	},



};
