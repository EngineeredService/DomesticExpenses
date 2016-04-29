/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Load required packages
var User = require('../model/UserModel');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var user = new User();

  // Set the client properties that came from the POST data
  user.name = req.body.name;
  user.userId = req.body.id;
  user.password = req.body.secret;

  // Save the client and check for errors
  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User added to the locker!', data: user });
  });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  User.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};


