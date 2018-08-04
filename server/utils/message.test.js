const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = "Dorian";
    var text = "Hi!";
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message.text).toBe(text);
    expect(message.from).toBe(from);
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = "Dorian";
    var latitude = 10.554564564;
    var longitude = 50.5456456456;
    var location = generateLocationMessage(from, latitude, longitude);
    expect(typeof location.createdAt).toBe('number');
    expect(location.from).toBe(from);
    expect(location.url).toBe(`https://www.google.com/maps/@10.554564564,50.5456456456`);
  });
});
