//Conexión a Mongoose.
var mongoose = require('mongoose');
var conn = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://aleg:31824131@dogen.mongohq.com:10031/crud', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});

//Documentos
var EmpleadoSchema = mongoose.Schema({
   nombre: String,
   apellido: String,
   domicilio: String,
   telefono: String,
   paseo: String,
   puesto: String
});

var Empleado = mongoose.model('Empleado', EmpleadoSchema);

//SECURITY
var RoleTypes = 'user admin'.split(' ');

var roleSchema = new Schema(
  {
      name: { 
          'type': String, 
          'enum': RoleTypes,
          index : true
      },
      privileges : [String]
  }
);

mongoose.model('Role', roleSchema);

var userSchema = new Schema(
    { 
        login:  String, 
        password: String, 
        roles: [{ 
            'type' : String, 
            'enum' : RoleTypes 
        }], 
        privileges : [String]
    }
);

mongoose.model('User', userSchema);

var Store = function(){
    var self = this;
    conn.once('open', function () {
        self.Role = conn.model('Role');
        self.User = conn.model('User');
        console.log('Store initialized');
    });
};

/**
 * Returns the user mapped to this username or null
 * 
 * If exists, the returned object should include the user's password
 * 
 * @param username
 * @returns the user mapped to this username or null  within the callback
 * @throws any error within the callback
 */
Store.prototype.lookup = function(username, callback) {
    this.User.findOne({
        login:username
    }, function(err, doc){
        if(err){
            callback(err);
        }
        else if(doc){
            callback(null, {
                username : doc.login, 
                password : doc.password
            });
        }
        else{
            callback();
        }
    });
};

/**
 * Returns the roles granted to the user mapped to this username as an array of string
 * 
 * @param username
 * @returns the roles granted to the user mapped to this username as an array of string within the callback
 * @throws any error within the callback
 */
Store.prototype.loadUserRoles = function(username, callback) {
    this.User.findOne({
        login:username
    }, 'roles', {}, function(err, doc){
        if(err){
            callback(err);
        }
        else if(doc){
            var roles = doc.roles;
            callback(null, roles);
        }
        else{
            callback();
        }
    });
};

/**
 * Returns the privileges granted to the user mapped to this username as an array of string
 * 
 * @param username
 * @returns the privileges granted to the user mapped to this username as an array of string within the callback
 * @throws any error within the callback
 */
Store.prototype.loadUserPrivileges = function(username, callback) {
    this.User.findOne({
        login:username
    }, 'privileges', {}, function(err, doc){
        if(err){
            callback(err);
        }
        else if(doc){
            var privileges = doc.privileges;
            callback(null, privileges);
        }
        else{
            callback();
        }
    });
};

/**
 * Returns the privileges granted to the role mapped to this role name as an array of string
 * 
 * @param roleName
 * @returns the privileges granted to the role mapped to this role name as an array of string within the callback
 * @throws any error within the callback
 */
Store.prototype.loadRolePrivileges = function(roleName, callback) {
    this.Role.findOne({
        name : roleName
    }, 'privileges', {}, function(err, doc){
        if(err){
            callback(err);
        }
        else if(doc){
            var privileges = doc.privileges;
            callback(null, privileges);
        }
        else{
            callback();
        }
    });
};

exports.store = new Store();