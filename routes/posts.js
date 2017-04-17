var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var auth = require('../auth');

router.get('/', function(req, res, next) {
    Post.find({}, function(err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;