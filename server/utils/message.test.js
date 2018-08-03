const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = "Dorian";
    var text = "Hi!";
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message.text).toBe(text);
    expect(message.from).toBe(from);
  })
});
