
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
  location: String,
  events:{}
});

module.exports = mongoose.model('user', User);