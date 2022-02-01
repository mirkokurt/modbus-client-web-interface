
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , net = require('net')
  , Modbus = require('jsmodbus');

var app = express();

const socket = new net.Socket()
const options = {
  'host': '192.168.1.11',
  'port': '502'
}
const client = new Modbus.client.TCP(socket,1)

/*socket.on('connect', function () {

  updateModbus();
  setInterval(updateModbus, 9000);

})*/

socket.on('error', console.error)
socket.connect(options)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/hero/:name', routes.hero);
app.get('/modbus/values', routes.getValues)
app.post('/hero/write_register', routes.writeRegister);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
