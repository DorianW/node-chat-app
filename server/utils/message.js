var generateMessage = function (from, text) {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = function (from, latitude, longitude) {
  return {
    from,
    url: `https://www.google.com/maps/@${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};
generateLocationMessage

module.exports = {generateMessage, generateLocationMessage};
