var app = angular.module('app');

app.controller('AuthController', ['AuthService', 'AuthToken', '$window', function(AuthService, AuthToken, $window) {
    var ctrl = this;

    ctrl.login = function(user) {
        AuthService.login(user).then(
            function(data) {
                console.log(data);
                AuthToken.setToken(data.token);
                user.email = '';
                user.password = '';
                $window.location.href = "/";
            },
            function(error) {
                ctrl.error = 'Invalid credentials';
            }
        );
    };

    ctrl.register = function(user) {
        AuthService.register(user).then(
            function(data) {
                $window.location.href = '/';
            },
            function(error) {
                ctrl.error = error;
            }
        );
    };

    ctrl.logout = function() {
        AuthToken.removeToken();
        $window.location.href = '/';
    };

    ctrl.isAuthenticated = function() {
        return AuthToken.isAuthenticated();
    };
}]);

app.controller('PostController', ['Reply', 'Vote', 'Post', '$window', function(Reply, Vote, Post, $window) {
    var ctrl = this;

    ctrl.init = function() {
        if ($window.post_id) {
            ctrl.post = Post.get({
                id: $window.post_id
            });
        } else {
            ctrl.posts = Post.query();
        }
    };

    ctrl.submitUrl = function(post) {
        if (post) {
            ctrl.loading = true;
            Post.save(post, function(p) {
                ctrl.loading = false;
                $window.location.href = '/';
            });
        }
    };

    ctrl.voteUp = function(id) {
        Vote.vote(id).then(function(data) {
            ctrl.init();
        }, function(error) {
            $window.location.href = "/login";
        });
    };

    ctrl.addComment = function(reply) {
        Reply.reply(ctrl.post._id, reply).then(function(data) {
            ctrl.init();
        }, function(error) {
            $window.location.href = "/login";
        });
    };

    ctrl.init();
}]);