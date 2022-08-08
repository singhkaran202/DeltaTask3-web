var express = require('express');
var router = express.Router();
var db=require('../database');//one folder back is there a database
var bodyParser = require("body-parser")
var bcrypt = require("bcrypt");

router.use(express.static(__dirname + '/public'));
// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

router.use(bodyParser.urlencoded({extended: true}))


// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
inputData= {
    namee: req.body.name,
    department:  req.body.department,
    email_address: req.body.email_address,
    hostel: req.body.hostel,
    password: req.body.password,
    confirm_password: req.body.confirm_password
}
  




// check unique email address
var sql='SELECT * FROM registration2 WHERE email_address =?';
db.query(sql, [inputData.email_address] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.email_address+ "was already exist";
  //  }else if(inputData.confirm_password != inputData.password){
    // var msg ="Password & Confirm Password is not Matched";
 }else{
   var password=inputData.password;
   var namee=inputData.namee;
   var department=inputData.department;
   var email_address=inputData.email_address;
   var hostel=inputData.hostel;

   bcrypt.hash(password,10, function(err, hash) { 
    var sql = "INSERT INTO registration2 (name,department,email_address,hostel,password) VALUES ?";
    var values = [[namee,department,email_address,hostel,hash]]
    db.query(sql,[values], function (err, inputData, fields) {
    if (err) throw err;
      //   // save users data into database
      //   var sql = 'INSERT INTO registration1 SET ?';
      //  db.query(sql, inputData, function (err, data) {
      //     if (err) throw err;
    });
    var msg ="You are successfully registered";
   });
   res.render('registration-form',{alertMsg:msg});
 }
});
});


module.exports = router;