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
	db.close(function(err){
		console.log("DB CLosed");
	});
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
	dailyExpense.save(function (err) {
  		if (err)
            res.send(err);
        db.close(function() {
			console.log("DB closed");
		});

        res.json({ message: 'Successfully created!' });
  		
	});
	console.log("Done");

   }); 
})
.delete('/:id', function(req, res, next) {

        var expenseId = req.param('id');
        console.log(expenseId);

        MongoClient.connect(url, function(err, db) {

        console.log("Connected...");
        assert.equal(null, err);

		db.collection('expenses').remove( {"_id":expenseId}, function(err, results) {
			assert.equal(null, err);
      		 if (err)
                res.send(err);

            db.close();
            res.json({ message: 'Successfully deleted' });
      	});
   });
});

module.exports = router;
