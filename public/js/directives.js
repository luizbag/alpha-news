var app = angular.module('app');

app.directive('feed', function() {
	return {
		restrict: 'E',
		controller: 'PostController',
		controllerAs: 'postCtrl',
		templateUrl: '/html/feed.html'
	};
});

app.directive('replyList', function() {
	return {
		restrict: 'E',
		scope: {
			replies: '=replies'
		},
		templateUrl: '/html/replies.html'
	};
});