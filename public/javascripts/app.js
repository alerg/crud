var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editar', {
        templateUrl: 'app/editar.html',
        controller: 'Editor'
      })
  }
]);