/**
 * 
 * @type Module express|Module express
 */
var passport = require('passport');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/**
 login
*/
router.get('/', function(req, res, next) {

	next();
})
.post('/', function(req, res, next) {
  passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
}

module.exports = router;
