var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


router.get('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://blr2211303.idc.oracle.com:27017/test';
	
	var deviceID = req.param('deviceID');
	console.log(deviceID);

	MongoClient.connect(url, function(err, db) {
	
	console.log("Connected...");
	assert.equal(null, err);
	
	// Create a collection we want to drop later
	var collection = db.collection('deviceData');
	
	console.log("Collections");
	//Peform a simple find and return all the documents
	collection.find().toArray(function(err, docs) {
	assert.equal(null, err);
	//assert.equal(0, docs.length);
      
	console.log("Find in collections");
	console.log(docs);

	res.send(docs);
	});
    
	});
})
.delete('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
        var ObjectId = require('mongodb').ObjectID;
        var url = 'mongodb://blr2211303.idc.oracle.com:27017/test';

        var deviceID = req.param('deviceID');
        console.log(deviceID);

        MongoClient.connect(url, function(err, db) {

        console.log("Connected...");
        assert.equal(null, err);

	db.collection('deviceData').deleteMany( {}, function(err, results) {
	assert.equal(null, err);
      	console.log(results);

	res.send(results);
      	});
   });
});

module.exports = router;
