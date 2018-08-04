var socket = io();

function scrollToButton() {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    text: msg.text,
    time: moment(msg.createdAt).format('HH:mm')
  });

  jQuery('#messages').append(html);
  scrollToButton();
});

socket.on('newLocationMessage', (msg) => {
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    time: moment(msg.createdAt).format('HH:mm'),
    url: msg.url
  });

  jQuery('#messages').append(html);
  scrollToButton();
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
