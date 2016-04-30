/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var assert = require('assert');
var User = require('../model/UserModel');

router.post('/', function(req, res, callback) {
  console.log(req);
  if (req.body && req.body.userId){
    var username = req.body.userId;
    var password = req.body.password;
    User.findOne({ userId: username }, function (err, user) {
     console.log(user);
     //error
     if (err) { 
          res.send(err);
     }
     //No such user
     if (!user) { 
          res.send(err);
     }
     
     // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { 
            res.send(err);
        }

        // Password did not match
        if (!isMatch) { 
            res.json({"error":"Wrong Password"});
        }

        // Success
        res.json({"message":"Successfully logged in"});
      });
   });
  }
});

module.exports = router;
