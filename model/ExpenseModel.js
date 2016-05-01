/**
 * 
 * @type Model ExpensesSchema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//DailyExpense schema
var expenseSchema = new Schema({
    type:{type:String, required:true},
    vendor:{type:String, required:true},
    creator:{type:String, required:true},
    value:{type:Number,required:true},
    creationTime:{type:Number, required:false},
    updatedTime:{type:Number, required:false}
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




	