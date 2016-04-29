var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function tasksRoute() {
  var tasks = new express.Router();
  tasks.use(cors());
  tasks.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  tasks.get('/', function(req, res) {
    console.log(new Date(), 'In tasks route GET / req.query=', req.query);
    var options = {
      method: 'GET',
      json:true
    }
    request(encodeURI(req.query.url), options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.json({msg: body, statusCode: response.statusCode});
      } else{
        res.json({msg: body, statusCode: response.statusCode});
        console.log(error);
      }
    });
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  tasks.post('/', function(req, res) {

  });

  return tasks;
}

module.exports = tasksRoute;
