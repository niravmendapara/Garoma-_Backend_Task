const express = require('express');
const router = express.Router();
const moment = require('moment')

const userModel = require('../Models/usersModel')
const meetingModel = require("../Models/meetingModel");

/* GET home page. */
router.get('/', async function(req, res, next) {
     res.render('index', { title: 'Express' });
});


/* A user can schedule a meeting with another user if they are free at that date and time */

router.post('/setmeeting', async function(req, res, next) {
try{
  // I have assumed that i am getting all this field from frontend.

  const useremail = req.body.useremail          // main user who wants to schedule meeting
  const meetingwith = req.body.meetingwithemail // other user with whome main user wants to schedule meeting
  const starttime = req.body.starttime          // starttime of meeting with date and time
  const endtime = req.body.endtime              // endtime of meeting with date and time
 
  const response = await meetingModel.find({ 
    $and: [
      {$or: [{userA: meetingwith},{userB: meetingwith}]}, 
      { $and: [{starttime: { $lt: new Date(req.body.endtime)} },{endtime: {$gt: new Date(req.body.starttime)}}] }]
    })
    
    console.log(response, response?.length);

    if(response?.length===0)
    {
      await meetingModel.insertMany({
        userA: useremail,
        userB: meetingwith,
        starttime: starttime,
        endtime: endtime
      })
      res.send({message: "New Meeting is scheduled!!!"});
    }
    else{
      res.send({message: "Sorry,,!! This user is not free in this provided time!!!"});
    }

}
catch(err){
  console.log(err)
  res.send({message: "Error !!!"})
}

});

/* A user can view another user’s meetings to see when they are free */
router.post('/checkavailability', async function(req, res, next) {
  // I have assumed that i am getting email id of the user to get all meeting details of that user and the date ( on which day of meeting data we want to get ).
  try {
    const meetingwith = req.body.meetingwithemail     // email id of the other user to get data
    const date = moment(new Date(req.body.date))      // date of the day (on which we wan to get data)
    const start_day = moment(date.startOf('day')) 
    const end_day = moment(date.endOf('day'));

    console.log(new Date(start_day) + ' // ' + new Date(end_day))

    const response = await meetingModel.find({
      $and: [
        { $or: [{userA: meetingwith},{userB: meetingwith}] }, 
        { $and: [{starttime: { $gt: new Date(start_day)} },{endtime: {$lt: new Date(end_day)}}] }]
      })
    console.log(response?.length)
    res.send({data: response})
  }
  catch(err){
    console.log(err)
    res.send({message: "Error !!!"})
  }
});



module.exports = router;
