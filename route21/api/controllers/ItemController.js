/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('http');

module.exports = {

  insert: function(req, res) {
    var url = req.param('url');
    res.send(url);

    var options = {
      host : url,
      port : 80,
      path : "/",
      method : 'GET'
    };

    var data = "";

    var req = http.request(options, function(res){
      res.on('data', function(chunk){
        console.log("We got some data");
      });

      res.on('end', function(){
        console.log("Request ended");
        res.send(data);
      });

      res.on('error', function(e){
        console.log(e.message);
      });

    });

  },

	find: function(req, res) {
		res.send('Hello World');
	}

};
