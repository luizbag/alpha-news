var app = angular.module('app');

app.controller('AuthController', ['AuthService', 'AuthToken', '$location', function(AuthService, AuthToken, $location) {
	var ctrl = this;

	ctrl.login = function(user) {
		AuthService.login(user, function(res) {
			if(res !== 'Unauthorized') {
				AuthToken.setToken(res.data.token);
				user.email='';
				user.password='';
			} else {
				ctrl.error = 'User not found';
			}
		});
	};

	ctrl.register = function(user) {
		AuthService.register(user, function(user) {
			$location.path('/');
		});
	};

	ctrl.logout = function() {
		AuthToken.removeToken();
		$location.path('/');
	};

	ctrl.isAuthenticated = function() {
		return AuthToken.isAuthenticated();
	};
}]);

app.controller('PostController', ['Post', '$location', function(Post, $location) {
	var ctrl = this;

	ctrl.init = function() {
		ctrl.posts = Post.query();
	};

	ctrl.submitUrl = function(url) {
		var post = {
			url: url
		};
		Post.save(post, function(p) {
			url = "";
			ctrl.init();
		});
	};

	ctrl.init();
}]);