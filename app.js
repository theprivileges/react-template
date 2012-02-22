
/**
 * Wickeddeveloper.com
 *
 * @author Luiz Lopes <http://twitter.com/theprivileges>
 */

var express, routes, app; 

express = require('express');
routes = require('./routes');

app = module.exports = express.createServer();

// Configuration

app.configure(function (){
  "use strict";
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public', compress: true }));
  app.use(app.router);
});

app.configure('development', function (){
  "use strict";
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function (){
  "use strict";
  var oneMonth;
  oneMonth = 2592000;
  app.use(express.static(__dirname + '/public', { maxAge: oneMonth }));
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
