var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function completeTaskRoute() {
  var completeTask = new express.Router();
  completeTask.use(cors());
  completeTask.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  completeTask.get('/', function(req, res) {
    console.log(new Date(), 'In completeTask route GET / req.query=', req.query);
    var options = {
      method: 'POST'
    }
    request(encodeURI(req.query.url), options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json({msg: 'Task completed'});
      } else if (error){
        res.json({msg: 'Went wrong: ' + error});
      } else{
        res.json({msg: 'Status code: ' + response.statusCode});
      }
    });
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  completeTask.post('/', function(req, res) {
  });

  return completeTask;
}

module.exports = completeTaskRoute;
