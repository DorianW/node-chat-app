var moment = require('moment');

var generateMessage = function (from, text) {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = function (from, latitude, longitude) {
  return {
    from,
    url: `https://www.google.com/maps/@${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};
generateLocationMessage

module.exports = {generateMessage, generateLocationMessage};
