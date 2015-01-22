app.controller('ListaEmpleados', function($scope, $http, $rootScope) {

   $scope.empleados = null;

   $rootScope.$on('someEvent', function(event, args) {
      $scope.empleados = args;
   });
});