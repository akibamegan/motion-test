const express = require('express')
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, function(){
	console.log('server is running on port ' + port);
});

// client (for mobile)
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/client/');
});

// host (for viewing on desktop)
app.get('/host', (req, res) => {
	res.sendFile(__dirname + '/public/host/');
});

app.use(express.static(__dirname + '/public/'));

var host = io.of('/public/host/');
var client = io.of('/public/client/');


//for every new socket connection
client.on('connection', function(socket) {
	console.log('new user connected: ' + socket.id);

	// receiving message from THIS socket client
	// emit message to the host to view on desktop
	socket.on('increase', function(data){
		console.log(data);
		host.emit('increase', data);
	});

	socket.on('complete', function(data){
		console.log(data);
		host.emit('complete', data);
	});

	socket.on('updateVal', function(data){
		console.log(data);
		host.emit('updateVal', data);
	})
});


// maxNumUsers = 2;
// let numOfUsers = 0;
// if(numOfUsers === maxNumUsers){
// 	console.log('please wait, someone is logged on.');
// 	socket.disconnect(true);
// 	return;
// }
