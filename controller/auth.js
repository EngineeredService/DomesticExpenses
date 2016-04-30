/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Client = require('../model/Client');
var User = require('../model/UserModel');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../model/AccessToken');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username + password);
    User.findOne({ userId: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect userid.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ userId: username }, function (err, user) {
      console.log(user);

      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
    Client.findOne({ userId: username }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }

      // Success
      return callback(null, client);
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ userId: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });

//exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });

//exports.isAuthenticated = passport.authenticate('local', { session : false });

exports.isAuthenticated = passport.authenticate('basic', { session : false });

