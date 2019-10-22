var socket = io();


var app = require('express')();
var httpSocketServer = require('http').createServer(app);
var io = require('socket.io')(httpSocketServer);

app.get('/', function(req, res){
	res.sendFile('index.html', { root: __dirname });
});

io.on('connection', function(socket){
	console.log('a user has connected');
	socket.emit('alert', { message: 'someone has connected'});
});


// listens for socket connection
httpSocketServer.listen(3000, function(){
	console.log('listening on *:3000');
});





function captureAcceleration() {
	if (!('ondevicemotion' in window)) {
		document.getElementById('dm-unsupported').classList.remove('hidden');
	} 
	else {
		document.getElementById('dm-info').classList.remove('hidden');

		window.addEventListener('devicemotion', function(event) {
			if(Math.round(event.acceleration.x) > 1) {
				document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
				document.getElementById('alert-message').classList.remove('hidden');
			}
			document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
			document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

		});
	}
}

function askPermission() {
	if(typeof DeviceMotionEvent.requestPermission === 'function') {
		DeviceMotionEvent.requestPermission()
		.then(permissionState => {
			if(permissionState === 'granted') {
				window.addEventListener('devicemotion', () => {
						// do something
						captureAcceleration();
					});
			}
		})
		.catch(console.error);
	}
	else {
			// regular non ios 13 devices
			captureAcceleration();
		}
}






