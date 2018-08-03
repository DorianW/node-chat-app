var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  console.log('[' + msg.createdAt + '] ' + msg.from + ' says: ' + msg.text);
});

setTimeout(() => {
  socket.emit('createMessage', {
    from: "Dorian",
    text: "Da bin ich wieder, Leute!"
  });
},1000)
