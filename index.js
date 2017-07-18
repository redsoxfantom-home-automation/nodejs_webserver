var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var serviceAccessor = require('nodejs-utils').serviceAccessor;
var config = require('./config.json');
var log = require('./logger')("index.js")

var lightsRouter = express.Router();



serviceAccessor.getService("1.0","lights",function(err,data) {
	var ws = require("socket.io-client")("http://"+data.host+":"+data.port)
   var light_array = []
   ws.on('connect',function() {
      log.info("Successfully connected to light server websocket")
      ws.on('light_update', function(data) {
         light_array=data
      })
   })

	lightsRouter.route('/')
	.get(function(req,res,next) {
		//request('http://'+data.host+':'+data.port+'/1.0/lights', function(err, resp, body) {
			//res.send(JSON.parse(body));
		//});
      res.send(light_array)
	})
   .post(function(req,res,next) {
      textToPost = JSON.stringify(req.body)
      log.info("Sending POST for ",textToPost)
      request({
         'Content-type': 'application/json',
         url: 'http://'+data.host+':'+data.port+'/1.0/lights/'+req.body.id,
         method: "POST",
         body: textToPost
      },
      function(err,resp,body) {
         log.info("Received Response: %j",resp)
      });
      next()
   });
});

var app = express()
   .use(bodyParser.json())
	.use(express.static(__dirname + '/public'))
	.use('/lights',lightsRouter)
	.listen(config.port);

log.info("Listening on port",config.port);
