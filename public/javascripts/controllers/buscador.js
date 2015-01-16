var aplicacion = angular.module('aplicacion', ['ngRoute']);


aplicacion.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/buscador.html',
    controller: 'BuscadorCtrl'
  });
}]);

/*
aplicacion.config(function($stateProvider){
    $stateProvider.state('buscador', {
      url: "",
      templateUrl: "templates/buscador.html"
    })
});*/

aplicacion.controller('BuscadorCtrl', function($scope, $http, $rootScope) {
   $scope.buscarEmpleados = function() {
      $http({
         method: 'GET',
         url: '/buscar',
         params: {
            nombre : $scope.nombre,
            apellido : $scope.apellido,
            paseo : $scope.paseo,
            puesto : $scope.puesto
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $rootScope.$emit('someEvent', data);
         }else{
            alert('Error al intentar recuperar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar recuperar el cliente.');
      });
   };
});