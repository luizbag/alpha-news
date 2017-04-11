var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: {type: String, required: true},
	url: {type:String, required: true},
	replies: [{}]
});

module.exports = mongoose.model('Post', PostSchema);