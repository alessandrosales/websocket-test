var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.enable('trust proxy');
app.set('view engine', 'jade');
app.set('views', process.cwd()+'/views');
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.render('exemplo1');
});

app.get('/chat', function(req, res){
  res.render('exemplo1');
});

app.get('/geolocazacao', function(req, res){
  res.render('exemplo2');
});

io.on('connection', function(socket){
  console.log('Novo usuário conectado!');
  io.emit('conectado', 'Novo usuário conectado!');

  socket.on('chat mensagem', function(msg){
    var ip = socket.request.socket.remoteAddress;
    var ip = ip != undefined ? String(ip).substring(7, 30) : null;

    console.log('mensagem: '+msg);
    io.emit('chat mensagem', msg, ip);
  });

  socket.on('window keypress', function(){
    var ip = socket.request.socket.remoteAddress;
    var ip = ip != undefined ? String(ip).substring(7, 30) : null;

    console.log('window keypress');
    io.emit('window keypress', ip);
  });

  socket.on('disconnect', function(){
    console.log('Usuário desconectado!');
  });
});

var server = http.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Acesse: http://locahost:%s', port);
});