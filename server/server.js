var express = require('express');
var parser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
var handler = require('./request-handler.js');
var mongoose = require('mongoose');


///SERVER AND DATABASE SETUPS
var app = express();
var port = 3000;
mongoose.connect('mongodb://localhost/jam');


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
app.post('/api/jams', handler.createJam);

app.get('/api/logout', function() {return true;});

app.listen(process.env.PORT || port);
console.log('server is serving at port: ', process.env.PORT || port);

module.exports = app;