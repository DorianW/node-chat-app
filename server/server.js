const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

  socket.on('createMessage', (msg) => {
    console.log('Handle new message', msg);

    // io.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));

  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });

});

server.listen(port, () => {
  console.log(`DaServer started with port: ${port}`);
});
