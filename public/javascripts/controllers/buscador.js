app.controller('Buscador', function($scope, employeeModel, $rootScope) {

   $scope.template = '/javascripts/views/buscador.html';

   $scope.buscarEmpleados = function() {

      employeeModel.nombre = this.nombre == "" ? null : this.nombre,
      employeeModel.apellido = this.apellido == "" ? null : this.apellido,
      employeeModel.paseo = this.paseo == "" ? null : this.paseo,
      employeeModel.puesto = this.puesto == "" ? null : this.puesto

      employeeModel.getEmployee(function (data){
         $rootScope.$emit('someEvent', data);
      });
   }
});