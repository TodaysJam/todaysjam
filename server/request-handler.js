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
          res.status(200).send(user);
        } else {
          res.status(409).send('password doesn\'t match');
        }
      });
    }
  });
};

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
  });
};

// fetch all jams 
exports.fetchJams = function (req, res) {
  Jam.find({}).exec(function(err, jams) {
    res.status(200).send(jams);
  });
};


// fetch all jams for the given user
// requires "username" field with username
exports.fetchUsersJams = function (req, res) {
  var userId = req.params.userId
  console.log('req.params*****', userId);
  Jam.find({user: {_id: userId}}).exec(function(err, jams) {
    console.log('found a user!!', jams);
    res.send(jams);
  });
};

//get the info on a given jam once a user clicks on it
// call should pass in the jam ID 
exports.getJamDetails = function (req, res) {
  Jam.find({id: req.body.id}).exec(function(err, jam) {
    res.status(200).send(jam);
  });
};

//increment counter and set last checkin timer 
// which we will query when deciding when to show new
// jams
// example API req object: "{"id":"580e793b068d540a65858365"}"
exports.checkinToJam = function (req, res) {
  Jam.findById(req.body.id, function(err, jam) {
    console.log(jam);
    jam.lastCheckin = Date.now();
    jam.score++;
    jam.save(function (err, updatedJam) {
      if (err) {
        return console.error(err);
      } else {
        res.status(200).send(updatedJam);
      }
    })
  });
};

// example call object: {
//   "name": "nameofJam",
//   "description": "descriptionofJam",
//   "public": "true",
//   "score": 0,
//   "lastCheckin": "undefined",
//   "userId": "5810fc2412927b26b437049a" 
// }
exports.createJam = function (req, res) {
  var newJam = new Jam({
    name: req.body.name,
    description: req.body.description,
    public: req.body.public,
    score: 0,
    lastCheckin: undefined,
    user: req.body.userId
  })
  newJam.save(function(err, savedJam) {
    if (err) {
      return console.error(err);
    } else {
      res.status(200).send(savedJam);
    }
  })
};