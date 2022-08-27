var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var users = new Schema(
  {
    userName: { type: String , require: true},
    userEmail: { type: String , require: true, unique: true},
  },
  { collection: "users" }
);


var users = mongoose.model('users', users);

module.exports = users