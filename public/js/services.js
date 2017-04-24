var app = angular.module('app');

app.factory('Post', ['$resource', function($resource) {
    return $resource('/posts/:id');
}]);

app.service('Vote', ['$http', function($http) {
    this.vote = function(id, callback) {
        $http.post('/posts/' + id + '/vote').then(
            function(data, status, headers, config) {
                callback(data);
            },
            function(data, status, headers, config) {
                callback('error');
            });
    };
}]);

app.service('Reply', ['$http', function($http) {
    this.reply = function(id, reply, callback) {
        $http.post('/posts/' + id + '/reply', {
            reply: reply
        }).then(
            function(data, status, headers, config) {
                console.log(data);
                callback(data);
            },
            function(data, status, headers, config) {
                console.log(data);
                callback('error');
            });
    };
}]);

app.service('AuthService', ['$http', function($http) {
    this.login = function(user, callback) {
        $http.post('/users/login', user).then(
            function(data, status, headers, config) {
                callback(data);
            },
            function(data, status, headers, config) {
                var token = "Unauthorized";
                callback(token);
            });
    };

    this.register = function(user, callback) {
        $http.post('/users', user).then(
            function(data, status, headers, config) {
                callback(data);
            },
            function(data, status, headers, config) {
                console.log(status);
            });
    };
}]);

app.factory('AuthToken', ['$window', function($window) {
    var storage = $window.localStorage;
    var cachedToken;
    return {
        setToken: function(token) {
            cachedToken = token;
            storage.setItem('token', token);
        },
        getToken: function() {
            if (!cachedToken)
                cachedToken = storage.getItem('token');
            return cachedToken;
        },
        removeToken: function() {
            cachedToken = null;
            storage.removeItem('token');
        },
        isAuthenticated: function() {
            return !!this.getToken();
        }
    };
}]);

app.factory('AuthInterceptor', function(AuthToken) {
    return {
        request: function(config) {
            var token = AuthToken.getToken();
            if (token)
                config.headers.Authorization = 'JWT ' + token;
            return config;
        },
        response: function(response) {
            return response;
        }
    }
})