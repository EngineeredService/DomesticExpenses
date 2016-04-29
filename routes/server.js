/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var clientController = require('../controller/ClientController');
var oauth2Controller = require('../controller/OAuth2');
var authController = require('../controller/auth');


var express = require('express');
var router = express.Router();

// Create endpoint handlers for /clients
router.route('/clients')
  .post(oauth2Controller.isAuthenticated, clientController.postClients)
  .get(oauth2Controller.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);