var app = angular.module('app');

app.directive('feed', function() {
	return {
		restrict: 'E',
		scope: {
			posts: '=posts'
		},
		templateUrl: '/html/feed.html'
	};
});