var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: '/html/home.html'
  }

  $stateProvider.state(homeState);

  $urlRouterProvider.otherwise('/home');
});