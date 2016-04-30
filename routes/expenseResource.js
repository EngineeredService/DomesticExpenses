/**
 * 
 * @type Application Resource
 * DailyExpenses
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');

var DailyExpense = require('../model/ExpenseModel.js');

router.get('/', function(req, res, next) {
  
      DailyExpense.find(function(err, expenses) {
            if (err)
                res.send(err);

           
            res.json(expenses);
        });
})
        .get('/:id', function(req, res, next) {
        DailyExpense.findById(req.params.id, function(err, expense) {
            if (err)
                res.send(err);
           
            res.json(expense);
        });	
   
})
        .post('/', function(req, res, next){
	var dailyExpense = new DailyExpense({
            "type": req.body.type,
            "vendor" :req.body.vendor, 
            "creator":req.body.creator, 
            "value":req.body.value,
            "creationTime": Date.now()
	});

        //Save to DB
	dailyExpense.save(function (err) {
            if (err)
                res.send(err);
          
            res.json({ message: 'Successfully created!' });
  		
	});

})
        .delete('/:id', function(req, res, next) {
                
        DailyExpense.remove({_id: req.params.id}, function(err) {
            if (err)
                res.send(err);

               
            res.json({ message: 'Successfully deleted' });
        });
    
});

module.exports = router;
