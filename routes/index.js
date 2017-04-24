var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Alpha News'
    });
});

router.get('/login', function(req, res, next) {
    res.render('register', {
        title: 'Login | Alpha News'
    });
});

router.get('/submit', function(req, res, next) {
    res.render('submit', {
        title: 'Send an article | Alpha News'
    });
});

router.get('/post/:id', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.render('post', {
            title: post.title + " | Alpha News",
            id: post._id
        });
    });
});

module.exports = router;