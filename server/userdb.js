var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Jam = require('./jamdb.js');

var UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  memberOfJams: [{ type: mongoose.Schema.ObjectId, ref: 'jams' }],
  ownerOfJams: [{ type: mongoose.Schema.ObjectId, ref: 'jams' }]
});

User = mongoose.model('users', UserSchema);

User.prototype.hashPassword = function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
};

UserSchema.pre('save', function(next) {
  this.hashPassword(next);
});

module.exports = User;