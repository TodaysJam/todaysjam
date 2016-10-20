var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

var User = require('./userdb');
var Jam = require('./jamdb');

//check user credentials and route the user as appropriate
//requires "username" field with username
//TODO: Give the user a session after the user submit correct useranme and password combination
exports.loginUser = function (req, res) {
  User.findOne({username: req.body.username}).exec(function(err, user) {
    if (!user) {
      res.status(404).send('can\'t find the user');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, match){
        if (match) {
          res.status(200).send(match);
        } else {
          res.status(409).send('password doesn\'t match');
        }
      }) 
    }
  })
}

//TODO Add user sessons after successfully creating a user
exports.signupUser = function (req, res) {
  User.findOne({username: req.body.username}).exec(function (err, user) {
    if (user) {
      res.status(409).send('User already exists');
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save(function (err, user) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(user);
        }
      });
    }
  })
}

// fetch all jams for the given user
// requires "user" field with username
exports.fetchJams = function (req, res) {
  Jam.find({username: req.body.user}).exec(function(err, jams) {
    res.status(200).send(jams);
  });
}

exports.createJam = function (req, res) {

}

