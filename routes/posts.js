"use strict";
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require('../models/User');
var auth = require('../auth');
var request = require('request');

router.get('/', function(req, res, next) {
    Post.find({}).sort({
            points: -1
        })
        .exec(function(err, posts) {
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

router.post('/', auth.authenticate(), function(req, res, next) {
    req.body.sent_by = req.user.nickname;
    if (!req.body.title) {
        request(req.body.url, function(err, response, body) {
            const regex = /<title>(.*)<\/title>/g;
            let m;
            while ((m = regex.exec(body)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                req.body.title = m[1];
                Post.create(req.body, function(err, post) {
                    if (err) return next(err);
                    res.json(post);
                });
            }
        });
    } else {
        Post.create(req.body, function(err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
});

router.post('/:id/vote', auth.authenticate(), function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        User.findById(req.user._id, function(err, user) {
            if (err) return next(err);
            if (user.votes.indexOf(post._id) === -1) {
                user.votes.push(post._id);
                user.save(function(error) {
                    if (error) return next(err);
                    post.points += 1;
                    post.save(function(e, p) {
                        res.json(p);
                    });
                });
            } else {
                res.json({
                    error: "You already upvoted this post"
                });
            }
        });
    });
});

router.post('/:id/reply', auth.authenticate(), function(req, res, next) {
    var reply = {};
    reply.text = req.body.reply;
    reply.author = req.user.nickname;
    reply.date = new Date().getTime();
    Post.findByIdAndUpdate(req.params.id, {
            $push: {
                replies: reply
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function(err, post) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(post);
        }
    );
});

module.exports = router;
