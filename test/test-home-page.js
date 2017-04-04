process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();

var server = require('../app');

chai.use(chaiHttp);

describe('HomePage', function() {
	it('Should return an html', function(done) {
		chai.request(server)
			.get('/')
			.end(function(err, res) {
				should.not.exist(err);
				should.exist(res);
				res.should.have.status(200);
				res.should.be.html;
				done();
			});
	});
});