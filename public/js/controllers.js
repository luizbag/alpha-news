var app = angular.module('app');

app.controller('AuthController', ['AuthService', 'AuthToken', '$window', function(AuthService, AuthToken, $window) {
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
			$window.location.href = '/';
		});
	};

	ctrl.logout = function() {
		AuthToken.removeToken();
		$window.location.href = '/';
	};

	ctrl.isAuthenticated = function() {
		return AuthToken.isAuthenticated();
	};
}]);

app.controller('PostController', ['Vote', 'Post', '$window', function(Vote, Post, $window) {
	var ctrl = this;

	ctrl.init = function() {
		ctrl.posts = Post.query();
	};

	ctrl.submitUrl = function(post) {
		if(post) {
			ctrl.loading = true;
			Post.save(post, function(p) {
				ctrl.loading = false;
				$window.location.href = '/';
			});
		}
	};

	ctrl.vote = function(id, n) {
		Vote.vote(id, n, function(data) {
			if(data !== 'error') {
				ctrl.init();
			}
		});
	};

	ctrl.init();
}]);