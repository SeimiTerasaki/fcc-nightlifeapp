var mongoose = require('mongoose');

var Rsvp = mongoose.Schema({
  location:String,
  rsvp:{ type : Array , default : [] }
});

module.exports = mongoose.model('rsvp', Rsvp);