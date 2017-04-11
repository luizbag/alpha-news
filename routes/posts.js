var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/:id', function(req, res, next) {
	Post.find({}, function(err, posts) {
		if(err) return next(err);
		res.json(posts);
	});
});

module.exports = router;