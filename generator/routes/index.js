var express = require('express');
var router = express.Router();
var userSchema = require('./userSchema.js');

var mongoose = require('mongoose');
const connectionString = 'mongodb+srv://yash1996mishra:Thatisnumber@1@cluster0-ghoub.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionString);
var userSchema = mongoose.model("Person", userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ShopCrimson' ,
  //login options, change to be reflected in login_links 
  login_option : 
  [{login_type : 'Student', login_link : 'student'},
  {login_type : 'Company', login_link : 'company'},
  {login_type : 'Placement Office', login_link : 'placementOffice'}],
  //login links, to be reflected in login_options
  forgot_credential: 'www.gmail.com'});
});

/* GET Student Page */
router.get('/student',function(req,res,next) {
  res.render('student');
});

router.post('/student', function(req, res,next){
  var personInfo = req.body;
  
  if(!personInfo.userId || !personInfo.userPassword){
     res.render('error', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new userSchema({
        userId: personInfo.userId,
        userPassword: personInfo.userPassword
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('error', {message: "Database error", type: "error"});
        else
        //NOT ERROR, REUSING FILE
           res.render('error', {
              message: "New person added", type: "success"});
     });
  }
  res.send("Student user saved as " + req.body.userId);
});

router.get('/company',function(req,res,next) {
  res.render('company');
});

module.exports = router;