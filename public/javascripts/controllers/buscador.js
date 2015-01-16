angular.module('buscador', ['ui.router'])
.config(function($stateProvider){
    $stateProvider
    .state('buscador', {
      url: "",
      templateUrl: "templates/buscador.html"
    })
})
.controller('BuscadorCtrl', function($scope, $http, $rootScope) {
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