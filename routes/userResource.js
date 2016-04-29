/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userController = require('../controller/UserController');
var express = require('express');
var router = express.Router();

// Create endpoint handlers for /clients
router.route('/clients')
  .post(userController.postClients)
  .get(userController.getClients);



