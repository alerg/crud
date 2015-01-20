angular.module('app').controller('Editor', function($scope, $routeParams, employeeModel) {
   
   $scope.template = '/javascripts/views/editor.html';

   $scope._id = $routeParams.index || null;
   $scope.nombre = '';
   $scope.apellido = ''
   $scope.paseo = '';
   $scope.puesto = '';
   $scope.telefono = '';

   employeeModel.getEmployeeById($scope._id, function(data){
      if(typeof(data) == 'object'){
         $scope = data;
      }else{
         alert('Error al intentar recuperar al cliente.');
      }
   });

   $scope.guardarEmpleado = function() {
      employeeModel.push(function(success){
         if(success){
            $scope.limpiarDatos();
            $scope.cargarEmpleados(); 
         }else{
            alert("Sucedio un error al guardar. intentelo nuevamente");
         }         
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