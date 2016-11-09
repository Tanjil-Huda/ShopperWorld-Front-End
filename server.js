var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userRegistrationDb');
var express = require('express');
var app = express();
var db = mongoose.connection;
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('files'));
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile(path.join(__dirname + '/index.html'));
})

// This responds a POST request for the homepage
//app.post('/', function (req, res) {
  // console.log("Got a POST request for the homepage");
   //res.send('Hello POST');
//})

app.post('/signup', function (req, res, next) {
    var user = {
       Name: req.body.name,
       Email: req.body.email,
       Pass: req.body.password,
       CofirmPassword: req.body.confirmpassword
   };

     var UserReg = mongoose.model('UserReg', RegSchema);
   UserReg.create(user, function(err, newUser) {
      if(err) return next(err);
      req.session.user = email;
      return res.send('Logged In!');
   });
});

app.post('/login', function (req, res, next) {
   var email = req.body.email;
   var password = req.body.password;

   User.findOne({Email: email, Pass: password}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Not logged in!');

      req.session.user = email;
      return res.send('Logged In!);
   });
});
    function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.user)) {
    return res.send('Not logged in!');
  }
  next();
}
    
    
app.get('/logout', function (req, res) {
   req.session.user = null;
});
    
// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})




 


