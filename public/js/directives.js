var app = angular.module('app');

app.directive('feed', function() {
	return {
		restrict: 'E',
		controller: 'PostController',
		controllerAs: 'postCtrl',
		templateUrl: '/html/feed.html'
	};
});