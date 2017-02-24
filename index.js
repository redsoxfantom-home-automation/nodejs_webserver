var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var serviceAccessor = require('nodejs-utils').serviceAccessor;
var config = require('./config.json');

var lightsRouter = express.Router();

serviceAccessor.getService("1.0","lights",function(err,data) {
	
	lightsRouter.route('/')
	.get(function(req,res,next) {
		request('http://'+data.host+':'+data.port+'/1.0/lights', function(err, resp, body) {
			res.send(JSON.parse(body));
		});
	})
   .post(function(req,res,next) {
      textToPost = JSON.stringify(req.body)
      console.log("Sending POST for ",textToPost)
      request({
         'Content-type': 'application/json',
         url: 'http://'+data.host+':'+data.port+'/1.0/lights/'+req.body.id,
         method: "POST",
         body: textToPost
      },
      function(err,resp,body) {
         console.log("Received Response: %j",resp)
      });
      next()
   });
});

var app = express()
   .use(bodyParser.json())
	.use(express.static(__dirname + '/public'))
	.use('/lights',lightsRouter)
	.listen(config.port);

console.log("Listening on port",config.port);
