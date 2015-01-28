var express = require('express');
var app = express();
var z = require('zetam');
var port = process.env.PORT || 3004;
var cookieParser = require('cookie-parser');
var security = require('security-middleware');

var mongoose = require('./config/mongoose');

app.use(cookieParser('asdfghjkl'));

//#######################SEGURIDAD

app.use(security({ 
  debug : false, // for debug purpose
  realmName : 'Express-security', // realm name
  store: mongoose.store,
  secure : true, // whether to use secured cookies or not - false by default
  credentialsMatcher: 'sha256', // a credentialsMatcher must be provided to check if the provided token credentials match the stored account credentials using the encryption algorithm specified
  loginUrl : '/login', // url used by the application to sign in - `/login` by default
  usernameParam : 'username', // name of the username parameter which will be used during form authentication - `username` by default
  passwordParam : 'password', // name of the password parameter which will be used during form authentication - `password` by default
  logoutUrl : '/logout', // url used by the application to sign out - `/logout` by default
  acl : [ // array of Access Controls to apply per url
    {
      url : '/', // web resource (s) on which this access control will be applied - `/*` if none specified
      methods : 'GET, POST', // HTTP method (s) for which this access control will be applied (GET, POST, PUT, DELETE or * for ALL) - `*` by default
      authentication : 'BASIC', // authentication type - FORM or BASIC
      rules : '([role=admin])' // access control rules to check
    }
  ]
}));

//#######################SEGURIDAD FIN


app.use(function(req,res,next){
	req.config = {}
	next();
});

z.load.paths([__dirname+'/globals']);

if(process.env.NODE_ENV == 'development'){
	console.log('development mode');
	app.use(require('connect-livereload')({ port: 35729}));
}

var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.use(z.middleware);

app.listen(port,function () {
	console.log('running on port ' + port);
});
