var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Expess' });
});
router.get('/lists', function(req, res) {
  res.render('lists', { title: 'My Grocery Lists', lists : Lists});
});
router.get('/list', function(req, res) {
  List.find(function(err, list, count) {
		res.render( 'list', {
			list: list
		});
	});
});
router.get('/list/create', function(req, res) {
  res.render('create', { title: 'Create a New List', name : null});
});
router.post('/list/create', function(req, res){
	console.log(req.body);
	new List({
		name : req.body.name,
		createdBy: null,
		items: []
	}).save(function(err, list, count){
		res.redirect('/list/:thing');
	});
});
router.get('/list/:thing', function(req, res) {
  List.findOne({slug: req.params.thing }, function(err, list, count) {
	res.render('lists', { title: list.name});
});
});
router.post('/list/:thing', function(req, res){
	console.log(req.body);
	new Item({
			name : req.body.name,
			quantity: req.body.quantity,
			slug: req.params.thing
		}).save(function(err, item, count){
		console.log(item.name);
		console.log(item.quantity);
	});
});
module.exports = router;
