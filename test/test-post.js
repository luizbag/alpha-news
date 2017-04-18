process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

var server = require('../app');

chai.use(chaiHttp);

var mongoose = require('mongoose');
var config = require('../config');
var Post = require('../models/Post');
var User = require('../models/User');

describe('Post', function() {

    var post = {
        title: 'Google',
        url: 'http://google.com.br'
    };

    var testUser = {
        email: 'test@test.com',
        password: '123456'
    };

    var testPost = {
        title: 'Luiz Bag',
        url: 'http://luizbag.com.br'
    };

    var testPost1 = {
        url: 'http://luizbag.com.br/escreva'
    };

    before(function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(config.mongoUri[process.env.NODE_ENV], done);
    });

    beforeEach(function(done) {
        Post.collection.drop(function() {
            Post.create(post, function() {
                User.collection.drop(function() {
                    User.create(testUser, done);
                });
            });
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
                    res.body._id.should.equal(p._id.toString());
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

    it('Should create a post in /posts POST with authentication token', function(done) {
        chai.request(server)
            .post('/users/login')
            .send(testUser)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('token');
                var token = res.body.token;
                chai.request(server)
                    .post('/posts')
                    .set('Authorization', 'JWT ' + token)
                    .send(testPost)
                    .end(function(err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.title.should.equal(testPost.title);
                        res.body.should.have.property('url');
                        res.body.url.should.equal(testPost.url);
                        done();
                    });
            });
    });

    it('Should not create post in /posts POST without authentication token', function(done) {
        chai.request(server)
            .post('/posts')
            .send(testPost)
            .end(function(err, res) {
                should.exist(err);
                should.exist(res);
                res.should.have.status(401);
                done();
            });
    });
});