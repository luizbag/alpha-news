var config = {};
config.secret = process.env.SECRET || '1234567890';

config.mongoUri = {
	development: 'mongodb://localhost/news-feed',
	test: 'mongodb://localhost/news-feed-test',
	prod: process.env.MONGOLAB_URI
};

module.exports = config;
