var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('list', { title: 'My Grocery List' , });
});

module.exports = router;
