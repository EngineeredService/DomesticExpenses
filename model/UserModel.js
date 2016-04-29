/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var UserSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  userId: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.methods.validPassword = function(password) {
    if (this.password === password) {
        return true;
    }
    return false;
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);


