process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

var server = require('../app');

chai.use(chaiHttp);

var User = require('../models/User');

describe('User', function() {
	User.collection.drop();

	var user = new User({
		email: 'test@test.com',
		password: '123456'
	});

	var testUser = new User({
		email: 'test2@test.com',
		password: '123456'
	});

	beforeEach(function(done) {
		user.save(function(err) {
			done();
		});
	});

	afterEach(function(done) {
		User.collection.drop();
		done();
	});

	it('Should create a SINGLE user in /users POST', function(done) {
		chai.request(server)
			.post('/users')
			.send(testUser)
			.end(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('email');
				res.body.email.should.equal(testUser.email);
				res.body.should.have.property('password');
				res.body.password.should.not.equal(testUser.password);
				done();
			});
	});

	it('Should get ALL users in /users GET', function(done) {
		chai.request(server)
			.get('/users')
			.end(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.should.have.lengthOf(1);
				res.body[0].should.have.property('_id');
				res.body[0].should.have.property('email');
				res.body[0].name.should.equal(user.email);
				res.body[0].should.have.property('password');
				res.body[0].password.should.not.equal(user.password);
				done();
			});
	});
});
