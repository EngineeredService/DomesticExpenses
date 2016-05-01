/**
 * 
 * @type Model ExpensesSchema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//DailyExpense schema
var expenseSchema = new Schema({
    type:String,
    vendor:String,
    creator:String,
    value:Number,
    creationTime:Number	
});

expenseSchema.methods.getId = function(){
	return this._id;
};

expenseSchema.methods.getValue = function(){
	return this.value;
};

expenseSchema.methods.getCreator = function() {
    return this.creator;
};

expenseSchema.methods.getVendor = function() {
    return this.vendor;
};


var Expense = mongoose.model('Expense', expenseSchema);


module.exports = Expense;




	