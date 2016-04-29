var express = require('express');
var router = express.Router();
var assert = require('assert');

var DailyExpense = require('../model/ExpenseModel.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

router.get('/', function(req, res, next) {
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!");
    });
	
      DailyExpense.find(function(err, expenses) {
            if (err)
                res.send(err);

           
            res.json(expenses);
        });
})
        .get('/:id', function(req, res, next) {
	
        console.log(req.params.id);

	 var db = mongoose.connection;
         db.on('error', console.error.bind(console, 'connection error:'));
         db.once('open', function() {
           console.log("we're connected!");
         });
	
        DailyExpense.findById(req.params.id, function(err, expense) {
            if (err)
                res.send(err);
           
            res.json(expense);
        });	
   
})
        .post('/', function(req, res, next){
 
                    var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                console.log("we're connected!");
            });
         
	//DailyExpense Model
        
        console.log(req.body);

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
          
            res.json({ message: 'Successfully created!' });
  		
	});
	console.log("Done");

})
        .delete('/:id', function(req, res, next) {

                    console.log(req.params.id);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                console.log("we're connected!");
            });

       
        DailyExpense.remove({_id: req.params.id}, function(err) {
            if (err)
                res.send(err);

               
            res.json({ message: 'Successfully deleted' });
        });
    
});

module.exports = router;
