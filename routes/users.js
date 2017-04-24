var express = require('express');
var router = express.Router();
var User = require('../models/User');
var cfg = require('../config');
var auth = require('../auth');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', auth.authenticate(), function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', function(req, res, next) {
    console.log('register');
    User.create(req.body, function(err, user) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(user);
    });
});

router.post('/login', function(req, res, next) {
    User.findOne({
        "email": req.body.email
    }, function(err, user) {
        if (err) return next(err);
        if (user) {
            user.comparePassword(req.body.password, function(match) {
                if (match) {
                    var token = jwt.sign({id: user._id}, cfg.secret);
                    res.json({'token': token});
                } else {
                    res.sendStatus(401);
                }
            });
        }
    })
});

module.exports = router;