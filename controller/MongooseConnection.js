/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var exports = module.exports = {};

var db;
if (!db) {
    db = mongoose.connect('mongodb://localhost/test');    
}

exports.connection = db;


