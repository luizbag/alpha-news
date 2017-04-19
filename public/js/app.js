var app = angular.module('app', ['ngResource', 'angular-ladda']);

app.config(function($httpProvider, laddaProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    laddaProvider.setOption({ /* optional */
        style: 'expand-right'
    });
});