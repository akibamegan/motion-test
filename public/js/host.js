(function() {

  // handle sockets
  var socket = io("/host");
  socket.on('increase', function(data){
  	console.log(data);
  	document.getElementById('myBar').style.width = data + '%';
  	document.getElementById('statusVal').innerHTML = data + '%';
  });


})();