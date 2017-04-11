var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var passport = require('passport');

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

router.use(passport.authenticate('jwt', {
        session: false
    }),
    function(req, res) {
        next();
    }
);

module.exports = router;