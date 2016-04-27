var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.post('/', function(req, res, next) {
	
});

module.exports = router;
