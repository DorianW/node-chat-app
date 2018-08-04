var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  var chat = '[' + msg.createdAt + '] ' + msg.from + ' says: ' + msg.text;
  console.log('chat');
  var li = jQuery('<li></li>');
  li.text(chat);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {from: "Pirat", text: "Hi!"}, (data) => {
//   console.log(data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "Pirat",
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
