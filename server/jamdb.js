var mongoose = require('mongoose');
var User = require('./userdb.js');

var JamSchema = new mongoose.Schema({
  name: String,
  description: String,
  public: Boolean, 
  creator: String,
  memberCount: Number,
  userMembers: [{ type: mongoose.Schema.ObjectId, ref: 'users' }]
})

var Jam = mongoose.model('jams', JamSchema);

module.exports = Jam;