var app = angular.module('app');

app.factory('Post', ['$resource', '$http', '$q', function($resource, $http, $q) {
    return $resource('/posts/:id');
}]);

app.factory('Vote', ['$http', '$q', function($http, $q) {
    return {
        vote: function(id) {
            return $http.post('/posts/' + id + '/vote')
                .then(
                    function(response) {
                        if (response.status === 401) {
                            return $q.reject(response.data);
                        } else if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },
                    function(response) {
                        return $q.reject(response.data);
                    }
                );
        }
    };
}]);

app.factory('Reply', ['$http', '$q', function($http, $q) {
    return {
        reply: function(id, reply) {
            return $http.post('/posts/' + id + '/reply', {
                    reply: reply
                })
                .then(
                    function(response) {
                        if (response.status === 401) {
                            return $q.reject(response.data);
                        } else if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function(response) {
                        return $q.reject(response.data);
                    }
                );
        }
    };
}]);

app.factory('AuthService', ['$http', '$q', function($http, $q) {
    return {
        login: function(user) {
            return $http.post('/users/login', user)
                .then(
                    function(response) {
                        if (response.status === 401) {
                            return $q.reject('Unauthorized');
                        } else if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function(response) {
                        return $q.reject(response.data);
                    }
                );
        },

        register: function(user) {
            return $http.post('/users', user)
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function(response) {
                        return $q.reject(response.data);
                    }
                );
        }
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