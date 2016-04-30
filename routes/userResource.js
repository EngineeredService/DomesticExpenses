/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userController = require('../controller/UserController');
var express = require('express');
var router = express.Router();

// Create endpoint handlers for users
router.route('/')
  .post(userController.postUsers)
  .get(userController.getUsers);
  
router.route('/:user_id')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);
  
module.exports = router;




