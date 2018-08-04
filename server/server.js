const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User joined'));

  socket.on('createMessage', (msg, callback) => {

    console.log('Handle new message', msg);
    socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
    callback();

  });

  socket.on('createLocation', (geo, callback) => {

    console.log('Handle new location', geo);
    socket.broadcast.emit('newLocationMessage', generateLocationMessage(geo.from, geo.pos.latitude, geo.pos.longitude));
    callback();

  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });

});

server.listen(port, () => {
  console.log(`DaServer started with port: ${port}`);
});
