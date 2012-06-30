var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var _ = require('underscore');
var config = require('./config');

/** Express configuration **/
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/** List of connected users **/
var connections = [];

/** Routes **/
app.get('/', function(req, res) {
  res.render('index');
});

io.on('connection', function(socket) {
  socket.on('set userid', function(userid) {
    console.log("New user connected and identified as " + userid);
    socket.set('userid', userid);

    connections.push(socket);

    socket.broadcast.emit('user count', connections.length);
  });

  socket.on('disconnect', function() {
    connections = _.without(connections, socket);
    socket.broadcast.emit('user count', connections.length);
  });
});

/** Start Express **/
app.listen(config.web.port);
console.log("Listening to " + config.web.port);