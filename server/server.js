const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (msg, callback) => {

    console.log('Handle new message', msg);
    socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
    callback();

  });

  socket.on('join', (params, callback) => {
    console.log('Handle join room...');

    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createLocation', (geo, callback) => {

    console.log('Handle new location', geo);
    socket.broadcast.emit('newLocationMessage', generateLocationMessage(geo.from, geo.pos.latitude, geo.pos.longitude));
    callback();

  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`));
    }
  });


});

server.listen(port, () => {
  console.log(`DaServer started with port: ${port}`);
});
