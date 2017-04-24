var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'News Feed'
    });
});

router.get('/login', function(req, res, next) {
    res.render('register', {
        title: 'Login - News Feed'
    });
});

router.get('/submit', function(req, res, next) {
    res.render('submit', {
        title: 'Send an article - News Feed'
    });
});

router.get('/post/:id', function(req, res, next) {
    res.render('post', {
        title: 'Post',
        id: req.params.id
    });
});

module.exports = router;