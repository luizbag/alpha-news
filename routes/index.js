var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'News Feed'
    });
});

router.get('/submit', function(req, res, next) {
    res.render('submit', {
        title: 'Send an article - News Feed'
    });
});

module.exports = router;