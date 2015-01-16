angular.module('aplicacion').controller('EmpleadosAct', function($scope, $http, $rootScope) {
   
   $scope._id = null;
   $scope.nombre = '';
   $scope.apellido = ''
   $scope.paseo = '';
   $scope.puesto = '';
   $scope.telefono = '';

   $scope.empleados = [];

    $rootScope.$on('someEvent', function(event, args) {
      $scope.empleados = args;
    });
  // another controller or even directive

   $scope.cargarEmpleados = function(){
      $http({
         method: 'GET', url: '/listar'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $scope.empleados = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };
   $scope.guardarEmpleado = function() {
      $http({
         method: 'POST',
         url: '/guardar',
         params: {
            nombre: $scope.nombre,
            apellido: $scope.apellido,
            telefono: $scope.telefono,
            paseo: $scope.paseo,
            puesto: $scope.puesto,
            _id: $scope._id
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $scope.limpiarDatos();
            $scope.cargarEmpleados(); 
         }else{
            alert('Error al intentar guardar el cliente.');
         }
      }).
      error(function() {
         alert('Error al intentar guardar el cliente.');
      });
   };
   $scope.recuperarEmpleado = function(indice) {
      $http({
         method: 'GET',
         url: '/recuperar',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $scope.clientes = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar el cliente.');
      });
   };
   $scope.eliminarEmpleado = function(indice) {
      $http({
         method: 'POST',
         url: '/eliminar',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(data == 'Ok'){
            $scope.limpiarDatos();
            $scope.cargarEmpleados();
         }else{
            alert('Error al intentar eliminar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar eliminar el cliente.');
      });
   };
   $scope.limpiarDatos = function() {
      $scope._id = null;
      $scope.nombre = '';
      $scope.apellido = '';
      $scope.paseo = '';
      $scope.puesto = '';
      $scope.telefono = '';
   };
});