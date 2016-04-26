var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.post('/', function(req, res, next) {
	console.log(req.body[0]);

	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://blr2211303.idc.oracle.com:27017/test';

	MongoClient.connect(url, function(err, db) {
      
	assert.equal(null, err);
	console.log("Connected correctly to server."); 

	db.collection('deviceData').insertOne( {
	"deviceID":req.body[0].source,
	"priority":req.body[0].priority,
	"creattionTime":req.body[0].eventTime,
	"dataFormat":req.body[0].payload.format,
	"data":req.body[0].payload.data
	},  function(err, result) {
	 assert(err, null);
	 console.log("Inserted data");
	});
	db.close();
   });
});

module.exports = router;
