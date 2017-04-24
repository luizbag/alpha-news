var config = {
	secret: process.env.SECRET || '1234567890',
	session: {session: false},
	mongoUri: {
		development: 'mongodb://localhost/news-feed',
		test: 'mongodb://localhost/news-feed-test',
		production: process.env.MONGODB_URI
	}
};

module.exports = config;
