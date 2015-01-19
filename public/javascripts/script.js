var aplicacion = angular.module('aplicacion', ['ngRouter']);

aplicacion.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/editar', {
        controller: 'Editor'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);