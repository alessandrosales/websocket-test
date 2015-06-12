var socket = io();

socket.on('window keypress', function(ip){
  if(!$('#panel-chat').find('.panel-heading').find('span').length){

    var msg = ip != null && ip != undefined && ip != '' ? ' ('+ip+')alguem está digitando...' : ' alguem está digitando...';

    $('#panel-chat').find('.panel-heading').append($('<span>').html(msg));
    setTimeout(function(){
      $('#panel-chat').find('.panel-heading').find('span').remove();
    }, 1000);
  }
});

socket.on('chat mensagem', function(msg, ip){

  ip = (ip != null && ip != undefined && ip != '' ? ' - '+ip : '');

  var d = new Date();
  var curr_hour = d.getHours();
  var curr_min = d.getMinutes();
  var curr_sec = d.getSeconds();

  data = curr_hour+':'+curr_min+':'+curr_sec;

  var small = $('<small>').html('enviado: '+data+ip);
  var p = $('<p>').html($('<b>').html(msg)).prepend($('<div>').append(small)).addClass('item');
  $('.box-message').append(p);
  scrollBottom();
});

function scrollBottom(){
  $('.box-message').animate({"scrollTop": $('.box-message')[0].scrollHeight}, "slow");
}

function chatSubmit(){

  var mensagem = $('input[name=mensagem]').val();

  if(!mensagem.length) return false;

  $('input[name=mensagem]').val('');
  $('input[name=mensagem]').focus();

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