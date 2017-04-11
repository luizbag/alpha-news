process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

var server = require('../app');

chai.use(chaiHttp);

var mongoose = require('mongoose');
var config = require('../config');
var Post = require('../models/Post');

describe('Post', function() {

    var post = {
        title: 'Google',
        url: 'http://google.com.br'
    };

    var testPost = {
        title: 'Luiz Bag',
        url: 'http://luizbag.com.br'
    };

    before(function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(config.mongoUri[process.env.NODE_ENV], done);
    });

    beforeEach(function(done) {
        Post.collection.drop(function() {
            Post.create(post, done);
        });
    });

    afterEach(function(done) {
        Post.collection.drop(done);
    });

    it('Should get ALL POSTS in /posts GET', function(done) {
        chai.request(server)
            .get('/posts')
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(1);
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].title.should.equal(post.title);
                res.body[0].should.have.property('url');
                res.body[0].url.should.equal(post.url);
                res.body[0].should.have.property('replies');
                res.body[0].replies.should.be.a('array');
                res.body[0].replies.should.have.lengthOf(0);
                done();
            });
    });

    it('Should get ONE POST in /posts/:id GET', function(done) {
        Post.create(testPost, function(err, p) {
            should.not.exist(err);
            should.exist(p);
            chai.request(server)
                .get('/posts/' + p._id)
                .end(function(err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body._id.should.equal(p._id);
                    res.body.should.have.property('title');
                    res.body.title.should.equal(p.title);
                    res.body.should.have.property('url');
                    res.body.url.should.equal(p.url);
                    res.body.should.have.property('replies');
                    res.body.replies.should.be.a('array');
                    res.body.replies.should.have.lengthOf(0);
                    done();
                });
        });
    });
});