const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: "dorianwojda@googlemail.com",
    text: "Hey! Wie geht es dir?",
    createdAt: Date.now()
  });

  socket.on('createEmail', (email) => {
    console.log('New email created', email);
  });

  socket.on('createMessage', (msg) => {
    console.log('Handle new message', msg);
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });

  socket.emit('newMessage', {
    from: "Admin Server",
    text: "Willkommen im Chat!",
    createdAt: Date.now()
  });

});



server.listen(port, () => {
  console.log(`DaServer started with port: ${port}`);
});
