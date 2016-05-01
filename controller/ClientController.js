/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Load required packages
var Client = require('../model/Client');
var exports = module.exports = {};

// Create endpoint /api/client for POST
exports.postClients = function(req, res, callback) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  // Save the client and check for errors
  client.save(function(err) {
    if (err)
      return callback();

    res.json({ message: 'Client added ...', data: client });
  });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res, callback) {
  // Use the Client model to find all clients
  Client.find(function(err, clients) {
    if (err)
      return callback();

    res.json(clients);
  });
};

//Create Endpoint /api/client/{client-id} GET
exports.getClient = function(req, res, callback) {
  // Use the Client
  Client.findById(req.params.client_id, function(err, client) {
    if (err)
      return callback();

    res.json(client);
   });
};

