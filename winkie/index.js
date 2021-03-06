var express = require('express');
var app = express();
app.use(bodyParser());
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3001;

server.listen(port, function() {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var numUsers = 0;

io.on('connection', function(socket) {
	var addedUser = false;

	app.post("/post", function(req, res) {
		console.log(".",req.body);
		socket.broadcast.emit('new message', req.body);
	});

	// when the client emits 'new message', this listens and executes
	socket.on('new message', function(data) {
		// we tell the client to execute 'new message'
		socket.broadcast.emit('new message', {
			username : socket.username,
			message : data
		});
	});

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function(username) {
		if (addedUser)
			return;

		// we store the username in the socket session for this client
		socket.username = username; ++numUsers;
		addedUser = true;
		socket.emit('new message', {
			username : "node",
			message : "welcome!",
			jsshow : ".box",
			jshide:".t0"
		});
		// echo globally (all clients) that a person has connected
		setTimeout(function() {
			socket.emit('new message', {
				username : "node",
				message : "please fix the button",
				jsshow : ".t1"
			});
		}, 1000);
	});

	// when the client emits 'typing', we broadcast it to others
	socket.on('typing', function() {
		socket.broadcast.emit('typing', {
			username : socket.username
		});
	});

	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', function() {
		socket.broadcast.emit('stop typing', {
			username : socket.username
		});
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function() {
		if (addedUser) {--numUsers;

			// echo globally that this client has left
			socket.broadcast.emit('user left', {
				username : socket.username,
				numUsers : numUsers
			});
		}
	});
});
