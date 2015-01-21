app.service("employeeModel", function($http){
   this._id = ''; 
   this.nombre = '';
   this.apellido = '';
   this.paseo = '';
   this.puesto = '';
   this.telefono = '';

   this.getEmployeeById = function(index, cb){

      $http({
         method: 'GET',
         url: '/buscar',
         params: {
            _id: index
         }
      }).
      success(function(data) {
         if(data.length == 1){
            cb(data[0]);
         }else{
            console.log('Error al intentar recuperar el empleado.');
            cb(null, {});
         }
      }).
      error(function() {
         console.log('Error al intentar recuperar el empleado.');
         cb(null, {});
      });        
   }

   this.getEmployee = function(cb){

      $http({
         method: 'GET',
         url: '/buscar',
         params: {
            nombre : this.nombre,
            apellido : this.apellido,
            paseo : this.paseo,
            puesto : this.puesto
         }
      }).
      success(function(data) {
         cb(data);
         /*if(typeof(data) == 'object'){
            $rootScope.$emit('someEvent', data);
         }else{
            alert('Error al intentar recuperar el cliente.');
         } */
      }).
      error(function() {
         console.log('Error al intentar recuperar el empleado.');
         return [];
      });        
   }

   this.getAll = function(cb){
      $http({
         method: 'GET', url: '/listar'
      }).
      success(function(data) {
         cb(data);
      }).
      error(function() {
         console.log('Error al intentar recuperar los empleados.');
         cb(null, {});
      });
   }

   this.push = function(cb){
      $http({
         method: 'POST',
         url: '/guardar',
         params: {
            nombre: this.nombre,
            apellido: this.apellido,
            telefono: this.telefono,
            paseo: this.paseo,
            puesto: this.puesto,
            _id: this._id
         }
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            cb({});
         }else{
            console.log('Error al intentar guardar al empleado.');
            cb(null, {});
         }
      }).
      error(function() {
         console.log('Error al intentar guardar al empleado.');
         cb(null, {});
      });
   }

   this.remove = function(index, cb){
      $http({
         method: 'POST',
         url: '/eliminar',
         params: {
            _id: index
         }
      }).
      success(function(data) {
         if(data == 'Ok'){
            cb({});
         }else{
            alert('Error al intentar eliminar al empleado.');
            cb(null, {});
         } 
      }).
      error(function() {
         alert('Error al intentar eliminar al empleado.');
         cb(null, {});
      });
   }
});



