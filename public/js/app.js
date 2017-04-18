var app = angular.module('app', ['ngResource']);

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});