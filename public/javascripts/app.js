var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'javascripts/views/home.html'
			}).
			when('/editar/:index', {
				templateUrl: 'javascripts/views/editor.html',
				controller: 'Editor'
			}).
			when('/login', {
				templateUrl: 'javascripts/views/Login.html',
				controller: 'Login'
			})
  }
]);