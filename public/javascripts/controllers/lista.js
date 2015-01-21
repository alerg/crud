app.controller('ListaEmpleados', function($scope, $http, $rootScope) {

   $scope.empleados = [];

   $rootScope.$on('someEvent', function(event, args) {
      $scope.empleados = args;
   });
});