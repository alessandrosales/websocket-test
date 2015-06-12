var socket = io();

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
  $('.box-message').animate({"scrollTop": $('.box-message')[0].scrollHeight}, "slow");
}

function chatSubmit(){

  var mensagem = $('input[name=mensagem]').val();

  if(!mensagem.length) return false;

  $('input[name=mensagem]').val('').focus();

  socket.emit('chat mensagem', mensagem);

  return false;
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

});