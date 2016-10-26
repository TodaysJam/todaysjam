var express = require('express');
var parser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
var handler = require('./request-handler.js');
var mongoose = require('mongoose');


///SERVER AND DATABASE SETUPS
var app = express();
var port = 3000;
// mongoose.connect('mongodb://localhost/jam');
mongoose.connect('mongodb://todaysjam:hr48@ds031617.mlab.com:31617/jamz');


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Mongoose connection is on ');
});

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// API CALLS
app.post('/api/users/login', handler.loginUser);
app.post('/api/users/signup', handler.signupUser);

app.get('/api/jams', handler.fetchJams);

app.get('/api/logout', function() {return true;});


app.get('/api/users/jams', handler.fetchUsersJams);
app.get('/api/jams', handler.getJamDetails);
app.post('/api/users/jams/checkin', handler.checkinToJam);
app.post('/api/jams/create', handler.createJam);


app.listen(process.env.PORT || port);
console.log('server is serving at port: ', process.env.PORT || port);

module.exports = app;