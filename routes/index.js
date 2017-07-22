var express = require('express');
var router = express.Router();
var serviceAccessor = require('nodejs-utils').serviceAccessor;
var logger = require('nodejs-utils').logger('index.js');

serviceAccessor.getService("1.0","lights", function(err,data){
	logger.info("Located lights service at "+data.host+":"+data.port)

	/* GET home page. */
	router.get('/', function(req, res, next) {
  		res.render('index', { title: 'Lights', host: data.host, port: data.port });
	});	
});

module.exports = router;
