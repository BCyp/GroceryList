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
		res.redirect('/list/'+list.slug);
	});
});
router.get('/list/:slug', function(req, res) {
  List.findOne({slug: req.params.slug}, function(err, list, count) {
	res.render('lists', { title: list.name, slug : list.slug, item : list.items, counter : 0});
});
});
router.post('/item/create', function(req, res){
	console.log(req.body);
	 List.findOne({slug: req.body.slug }, function(err, list, count) {
	new Item({
			name : req.body.name,
			quantity: req.body.quantity,
			slug: req.body.slug,
			checked: false
		}).save(function(err, item, count){
			console.log(req.body);
		  	list.items.push(item);
		list.save(function(err, list, count){
		res.redirect('/list/'+list.slug);
		});
	});
});
});
router.post('/item/check', function(req, res){
	console.log(req.body);
	console.log(req.body.check);
	 List.findOne({slug: req.body.slug }, function(err, list, count) {
			for(var i =0; i < req.body.check.length; i++){
				var checker = req.body.check[i];
				list.items[checker].checked = true;

			};
		list.save(function(err, list, count){
		res.redirect('/list/'+list.slug);
		});
	});
});

module.exports = router;
