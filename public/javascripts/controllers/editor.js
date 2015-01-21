angular.module('app').controller('Editor', function($scope, $routeParams, employeeModel) {
   
   $scope._id = $routeParams.index || null;
   $scope.nombre = '';
   $scope.apellido = ''
   $scope.paseo = '';
   $scope.puesto = '';
   $scope.telefono = '';

   employeeModel.getEmployeeById($scope._id, function(data){
      if(typeof(data) == 'object'){
         $scope.nombre = data.nombre;
         $scope.apellido = data.apellido;
         $scope.paseo = data.paseo;
         $scope.puesto = data.puesto;
         $scope.telefono = data.telefono;
      }else{
         alert('Error al intentar recuperar al cliente.');
      }
   });

   $scope.guardarEmpleado = function() {
      employeeModel._id = $routeParams.index;
      employeeModel.nombre = $scope.nombre;
      employeeModel.apellido = $scope.apellido;
      employeeModel.paseo = $scope.paseo;
      employeeModel.puesto = $scope.puesto;
      employeeModel.telefono = $scope.telefono;
      employeeModel.push(function(success){
         if(success){
            alert('Datos actualizados.');
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