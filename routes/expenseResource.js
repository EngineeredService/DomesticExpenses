var express = require('express');
var router = express.Router();

var DailyExpense = require('../model/ExpenseModel.js');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {
	
	var deviceID = req.param('id');
	console.log(deviceID);

	MongoClient.connect(url, function(err, db) {
	
	console.log("Connected...");
	assert.equal(null, err);
	
	// Create a collection we want to drop later
	var collection = db.collection('expenses');
	
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
.post('/', function(req, res, next){
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;

	MongoClient.connect(url, function(err, db) {
      
	assert.equal(null, err);
	console.log("Connected...");

	//DailyExpense Model

	var dailyExpense = new DailyExpense({
		"type": req.body.type,
		"vendor" :req.body.vendor, 
		"creator":req.body.creator, 
		"value":req.body.value, 
		"creationTime": Date.now()
	});
	console.log(dailyExpense);
	//Save to DB
	dailyExpense.save(function (err, dailyExpense) {
  		if (err) {
  			return console.error(err);
  		}
  		console.log(dailyExpense.getValue()+":"+ dailyExpense.getId());

  		db.close(function() {
			console.log("DB closed");
		});
	});

   }); 
})
.delete('/', function(req, res, next) {
        var ObjectId = require('mongodb').ObjectID;

        var expenseId = req.param('id');
        console.log(expenseId);

        MongoClient.connect(url, function(err, db) {

        console.log("Connected...");
        assert.equal(null, err);

		db.collection('expenses').delete( {"_id":expenseId}, function(err, results) {
			assert.equal(null, err);
      		console.log(results);

			res.send(results);
      	});
   });
});

module.exports = router;
