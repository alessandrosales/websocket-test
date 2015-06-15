var socket = io();

//Socket
socket.on('conectado', function(msg){
  novaMensagemSimples(msg);
  scrollBottom();
});

socket.on('desconectado', function(msg){
  novaMensagemSimples(msg);
  scrollBottom();
});

socket.on('chat mensagem', function(msg, ip){
  novaMensagemUsuario(msg, ip);
  scrollBottom();
});

socket.on('window keypress', function(ip){
  if(!$('#panel-chat').find('.panel-heading').find('span').length){

    var msg = ip != null && ip != undefined && ip != '' ? ' ('+ip+')alguem está digitando...' : ' alguem está digitando...';

    $('#panel-chat').find('.panel-heading').append($('<span>').html(msg));
    setTimeout(function(){
      $('#panel-chat').find('.panel-heading').find('span').remove();
    }, 1000);
  }
});

//Chat
function novaMensagemSimples(msg){
  var p = $('<p>').html($('<b>').html(msg)).addClass('item');
  $('.box-message').append(p);
}

function novaMensagemUsuario(msg, ip){

  ip = (ip != null && ip != undefined && ip != '' ? ' - '+ip : '');

  var d = new Date();

  var data = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

  var small = $('<small>').html('enviado: '+data+ip);
  var p = $('<p>').html($('<b>').html(msg)).prepend($('<div>').append(small)).addClass('item');
  $('.box-message').append(p);
}

function scrollBottom(){
  if(!$('.box-message').length) return;
  $('.box-message').animate({"scrollTop": $('.box-message')[0].scrollHeight}, "slow");
}

function chatSubmit(){

  var mensagem = $('input[name=mensagem]').val();

  if(!mensagem.length) return false;

  $('input[name=mensagem]').val('').focus();

  socket.emit('chat mensagem', mensagem);

  return false;
}

//Geolocalização

socket.on('set endereco', function(op, ip){
  switch(op){
    case 1:
      setEnd1();
      break;
    case 2:
      setEnd2();
      break;
    case 3:
      setEnd3();
      break;
  }
});

var map = null;

function setEnd1(){

  if(!map) return;

  // add a marker in the given location, attach some popup content to it and open the popup
  L.marker([-3.722778, -38.485921]).addTo(map)
      .bindPopup('Beira Mar, Fortaleza, CE')
      .openPopup();
  
}
function setEnd2(){

  if(!map) return;

  // add a marker in the given location, attach some popup content to it and open the popup
  L.marker([-3.7225736,-38.5226216]).addTo(map)
      .bindPopup('Dragão do Mar, Fortaleza, CE')
      .openPopup();
  
}
function setEnd3(){

  if(!map) return;

  // add a marker in the given location, attach some popup content to it and open the popup
  L.marker([-3.75529,-38.488498]).addTo(map)
      .bindPopup('Iguatemi, Fortaleza, CE')
      .openPopup();
  
}

function opcoes(){
  bootbox.dialog({
    message: "Escolha um dos endereços: <br /> 1 - Beira Mar <br />2 - Dragão do Mar <br />3 - Iguatemi Fortaleza",
    buttons: {
      primeiro: {
        label: 'End. 1',
        className: "btn-warning",
        callback: function(){
          socket.emit('set endereco', 1);
        }
      },
      segundo: {
        label: 'End. 2',
        className: "btn-primary",
        callback: function(){
          socket.emit('set endereco', 2);
        }
      },
      terceiro: {
        label: 'End. 3',
        className: "btn-success",
        callback: function(){
          socket.emit('set endereco', 3);
        }
      },
    }
  });
}

function configMap(){

  if(!$('#map').length) return;

  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map('map').setView([-3.734602,-38.527014],12);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.alessandrosales.com.br">Alessandro Sales</a> contributors'
  }).addTo(map);

  // add a marker in the given location, attach some popup content to it and open the popup
  L.marker([-3.734602, -38.527014]).addTo(map)
      .bindPopup('Fortaleza, CE')
      .openPopup();

  setTimeout(function(){
    opcoes();
  }, 500);

}

$(document).ready(function(){
  
  $('input[name=mensagem]').focus();

  $('input[name=mensagem]').on({
    keyup: function(){
      socket.emit('window keypress');
    },
    keypress: function(){
      socket.emit('window keypress');
    }
  });

  configMap();

});