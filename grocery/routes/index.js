var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');
var Lists = [];
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Expess' });
});
router.get('/lists', function(req, res) {
  res.render('lists', { title: 'My Grocery Lists', lists : Lists});
});
router.get('/list', function(req, res) {
  res.render('list', { title: 'My Grocery List'});
});
router.get('/list/create', function(req, res) {
  res.render('create', { title: 'Create a New List', name : null});
});
router.post('/list/create', function(req, res){
	console.log(req.body);
	var newList = new List({
		name : req.body.name,
		createdBy: null,
		items: []
	});
	console.log(newList.slug);
	Lists.push(newList);
	console.log(Lists);
	res.redirect('/list')
});
module.exports = router;
