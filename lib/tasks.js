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
    request(encodeURI(req.query.tasks), options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.json({msg: body});
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
  tasks.post('/', function(req, res) {
    console.log(new Date(), 'In tasks route POST / req.body=', req.body);
    var world = req.body && req.body.tasks ? req.body.tasks : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'tasks POST' + world});
  });

  return tasks;
}

module.exports = tasksRoute;
