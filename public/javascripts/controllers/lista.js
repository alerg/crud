app.controller('ListaEmpleados', function($scope, $http, $rootScope) {

   $scope.template = '/javascripts/views/lista.html';

   $scope.empleados = [];

   $rootScope.$on('someEvent', function(event, args) {
      $scope.empleados = args;
   });
});