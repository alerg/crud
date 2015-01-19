aplicacion.controller('ListaEmpleados', function($scope, $http, $rootScope) {

   $scope.template = '/javascripts/templates/lista.html';

   $scope.empleados = [];

   $rootScope.$on('someEvent', function(event, args) {
      $scope.empleados = args;
   });
});