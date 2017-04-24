"use strict";
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
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
        post.points += req.body.vote;
        post.save(function(err) {
            if (err) return next(err);
            res.json(post);
        });
    });
});

router.post('/:id/reply', auth.authenticate(), function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        post.replies.push(req.body.reply);
        post.save(function(err) {
            if (err) return next(err);
            res.json(post);
        });
    });
});

module.exports = router;