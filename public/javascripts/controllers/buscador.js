aplicacion.controller('Buscador', function($scope, $http, $rootScope) {

  $scope.template = '/javascripts/templates/buscador.html';

  $scope.buscarEmpleados = function() {
      $http({
         method: 'GET',
         url: '/buscar',
         params: {
            nombre : this.nombre == "" ? null : this.nombre,
            apellido : this.apellido == "" ? null : this.apellido,
            paseo : this.paseo == "" ? null : this.paseo,
            puesto : this.puesto == "" ? null : this.puesto
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