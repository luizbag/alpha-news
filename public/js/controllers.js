var app = angular.module('app');

app.controller('FeedController', ['Post', function(Post) {
	var ctrl = this;

	var init = function() {
		ctrl.posts = Post.query();
	};

	init();
}]);