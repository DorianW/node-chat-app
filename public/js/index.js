var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  var chat = '[' + moment(msg.createdAt).format('HH:mm') + '] ' + msg.from + ' says: ' + msg.text;
  console.log('chat');
  var li = jQuery('<li></li>');
  li.text(chat);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (msg) => {
  console.log(msg);

  var chat = '[' + moment(msg.createdAt).format('HH:mm') + '] ' + msg.from + ' says: My current location!';
  var li = jQuery('<li></li>');
  var a = jQuery('<a>' + chat + '</a>');
  a.attr('target', '_blank');
  a.attr('href', msg.url);
  jQuery(li).append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "Pirat",
    text: jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val('');
  });
});

var geoButton = jQuery('#send-location');

geoButton.on('click', function (e) {
  e.preventDefault();
  if (!navigator.geolocation) {
    console.log('No Geolocation API');
    return alert('No Geolocation API');
  }

  geoButton.attr('disabled', 'disabled').text('Sending...');

  navigator.geolocation.getCurrentPosition(function (pos) {
    console.log('Emitting createLocation');
    socket.emit('createLocation', {
      from: "Pirat",
      pos: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
    }, function () {
      geoButton.removeAttr('disabled').text('Send location');
    });

  }, function () {
    alert('Unable to fetch location');
  });

});
