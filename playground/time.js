var moment = require('moment');

var date = moment();
date.subtract(1, 'year');
console.log(date.format('MMM Do YYYY: hh:mm a'));
