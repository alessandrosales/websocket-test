//Instanciação de objetos
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Configuração da Aplicação
app.enable('trust proxy');
app.set('view engine', 'jade');
app.set('views', process.cwd()+'/views');
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/lib'));

//Rotas
app.get('/', function(req, res){
  res.render('exemplo1');
});

app.get('/chat', function(req, res){
  res.render('exemplo1');
});

app.get('/geolocazacao', function(req, res){
  res.render('exemplo2');
});

//Eventos do Socket
io.on('connection', function(socket){
  console.log('Novo usuário conectado!');

  //Emite a informação de que um novo usuário está conectado ao chat
  io.emit('conectado', 'Novo usuário conectado!');

  //Emite uma mensagem para todos os clientes conectados
  socket.on('chat mensagem', function(msg){
    var ip = socket.request.socket.remoteAddress;
    var ip = ip !== undefined ? String(ip).substring(7, 30) : null;

    console.log('mensagem: '+msg);
    io.emit('chat mensagem', msg, ip);
  });

  //Emite a informação que alguém está digitando uma mensagem
  socket.on('window keypress', function(){
    var ip = socket.request.socket.remoteAddress;
    var ip = ip !== undefined ? String(ip).substring(7, 30) : null;

    console.log('window keypress');
    io.emit('window keypress', ip);
  });

  socket.on('set endereco', function(op){
    var ip = socket.request.socket.remoteAddress;
    var ip = ip !== undefined ? String(ip).substring(7, 30) : null;

    console.log('set endereco: '+op);
    io.emit('set endereco', op, ip);

  });

  //Emite a informação que um usuário se desconectou do chat
  socket.on('disconnect', function(){
    console.log('Um usuário saiu do chat!');
    io.emit('desconectado', 'Um usuário saiu do chat!');
  });
});

//Iniciação do Servidor
var server = http.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Acesse: http://locahost:%s', port);
});