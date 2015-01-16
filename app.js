var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//#######################ACCIONES

app.get('/', function(req, res){
   res.sendfile('./public/javascripts/app/index.html');
});

app.get('/buscar', function(req, res){
   
   Cliente.find(req.query, function(error, clientes){
      if(error){
         res.send('Error.');
      }else{
         res.send(clientes);
      }
   })
});

app.get('/listar', function(req, res){
   Cliente.find({}, function(error, clientes){
      if(error){
         res.send('Error.');
      }else{
         res.send(clientes);
      }
   })
});

app.get('/recuperar', function(req, res){
   Cliente.findById(req.query._id, function(error, documento){
      if(error){
         res.send('Error.');
      }else{
         res.send(documento);
      }
   });
});

app.post('/guardar', function(req, res){
   if(req.query._id == null){
      var cliente = new Cliente({
         nombre: req.query.nombre,
         apellido: req.query.apellido,
         domicilio: req.query.domicilio,
         telefono: req.query.telefono,
         paseo: req.query.paseo,
         puesto: req.query.puesto
      });

      cliente.save(function(error, documento){
         if(error){
            res.send('Error.');
         }else{
            res.send(documento);
         }
      });
   }else{
      //Modifica
      Cliente.findById(req.query._id, function(error, documento){
         if(error){
            res.send('Error al intentar modificar el personaje.');
         }else{
            var cliente = documento;
            cliente.nombre = req.query.nombre;
            cliente.apellido = req.query.apellido;
            cliente.domicilio = req.query.domicilio;
            cliente.telefono = req.query.telefono;
            cliente.paseo = req.query.paseo;
            cliente.puesto = req.query.puesto;

            cliente.save(function(error, documento){
               if(error){
                  res.send('Error.');
               }else{ 
                  res.send(documento);
               }
            });
         }
      });
   }
});

app.post('/eliminar', function(req, res){
   Cliente.remove({_id: req.query._id}, function(error){
      if(error){
         res.send('Error.');
      }else{
         res.send('Ok');
      }
   });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})


module.exports = app;


//Conexión a Mongoose.
var mongoose = require('mongoose');
mongoose.connect('mongodb://aleg:31824131@dogen.mongohq.com:10031/crud', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});

//Documentos
var ClienteSchema = mongoose.Schema({
   nombre: String,
   apellido: String,
   domicilio: String,
   telefono: String,
   paseo: String,
   puesto: String
});
var Cliente = mongoose.model('Cliente', ClienteSchema);