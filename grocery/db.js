var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');

	var Item = new mongoose.Schema({
		name: String,
		quantity: 0,
		checked: false
	});
	// my schema goes here!
	var List = new mongoose.Schema({
		name: String,
		createdBy: String ,
		items: [Item]
	});

	List.plugin(URLSlugs('name'));
	mongoose.model('List', List);
	mongoose.model('Item', Item);
	mongoose.connect('mongodb://localhost/grocerydb');