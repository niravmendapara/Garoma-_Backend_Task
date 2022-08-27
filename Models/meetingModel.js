
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var meetings = new Schema(
  {
    userA: { type: String, required: true },
    userB:  { type: String, required: true },
    meetingname: { type: String , required: true},
    starttime: { type: Date , required: true},
    endtime: { type: Date , required: true }
  },
  { collection: "meetings" }
);


var meetings = mongoose.model('meetings', meetings);

module.exports = meetings