var app = angular.module('app');

app.controller('FeedController', function() {
	var ctrl = this;

	ctrl.posts = [
		{title: 'Post 1',
		n_comments: 0},
		{title: 'Post 2',
		n_comments: 18}
	];
});