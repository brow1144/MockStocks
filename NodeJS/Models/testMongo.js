let mongoose = require('mongoose');

let TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('testMongo', TestSchema);
