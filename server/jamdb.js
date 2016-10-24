var mongoose = require('mongoose');
var User = require('./userdb.js');

var JamSchema = new mongoose.Schema({
  name: String,
  description: String,
  public: {type: Boolean, default: true},
  score: Number,
  lastCheckin: Date,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})

var Jam = mongoose.model('jams', JamSchema);

module.exports = Jam;