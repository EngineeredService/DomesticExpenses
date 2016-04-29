/**
DailyExpense Test
*/

var DailyExpense = require('./ExpenseModel.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we're connected!");
});


//DailyExpense Model

var dailyExpense = new DailyExpense({
	"type":"Food", 
	"vendor" :"CCD", 
	"creator":"chitta", 
	"value":125, 
	"creationTime": Date.now()
});

console.log(dailyExpense.getValue()+":"+dailyExpense.getId());

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

