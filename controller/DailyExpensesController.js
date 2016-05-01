/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var DailyExpense = require('../model/ExpenseModel');
var exports = module.exports = {};

exports.createExpense = function(req, res, next) {
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
                return next();
          
            res.json({ message: 'Successfully created!' });
  		
	});

};

exports.getExpenses = function(req, res, next) {
    DailyExpense.find(function(err, expenses) {
            if (err)
                return next();
           
            res.json(expenses);
        });
};

exports.getExpenseById = function(req, res, next) {
     DailyExpense.findById(req.params.id, function(err, expense) {
            if (err)
               return next();
           
            res.json(expense);
        });
};

exports.putExpense = function(req, res, next) {
    DailyExpense.findById(req.params.id, function(err, expense) {
            if (err)
               return next();
    if (req && req.body){
        if (req.body.type)
            expense.type = req.body.type;
            expense.vendor = req.body.vendor;
            expense.value = req.body.value;
            expense.updatedTime = req.body.updatedTime;
    }

    // Save the user and check for errors
    expense.save(function(err) {
      if (err)
        return callback(err);

      res.json(expense);
    });
    
    });
};

exports.deleteExpense = function(req, res, next){
     DailyExpense.remove({_id: req.params.id}, function(err) {
            if (err)
                return next();

               
            res.json({ message: 'Successfully deleted' });
        });
};


