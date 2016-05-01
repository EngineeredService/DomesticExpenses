/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Load required packages
var User = require('../model/UserModel');
var exports = module.exports = {};
var connection = require('./MongooseConnection');
// Create endpoint /api/client for POST
exports.postUsers = function(req, res, callback) {

  // Create a new instance of the Client model
  var user = new User();

  // Set the client properties that came from the POST data
  user.name = req.body.name;
  user.userId = req.body.userId;
  user.password = req.body.password; 
  
  // Save the client and check for errors
  user.save(function(err) {
    if (err)
      return callback(err);
  
    res.json({ message: 'User added ...', data: user });
  });
  
};

// Create endpoint /api/clients for GET
exports.getUsers = function(req, res, callback) {
  // Use the Client model to find all clients
  User.find( function(err, clients) {
    if (err)
      return callback(err);

    res.json(clients);
  });
};

exports.getUser = function(req, res, callback){
    // Use the Beer model to find a specific user
    User.findById(req.params.user_id, function(err, user) {
    if (err)
      return callback(err);

    res.json(user);
  });
};
//endpoint PUT
exports.putUser = function(req, res, callback) {
    // Use the User model to find a specific user
    User.findById(req.params.user_id, function(err, user) {
    if (err)
      return callback(err);

    // Update User information
    if (req && req.body){
        if (req.body.password)
            user.password = req.body.password;
    }

    // Save the user and check for errors
    user.save(function(err) {
      if (err)
        return callback(err);

      res.json(user);
    });
  });
};

//endpoint DELETE
exports.deleteUser = function(req, res, callback) {
    // Use the User model to find a specific user and remove it
    User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      return callback(err);

    res.json({ message: 'User removed ..!' });
  });
};

