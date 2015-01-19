var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editar', {
        controller: 'Editor'
      }).
      when('/buscar', {
        controller: 'Buscador'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);