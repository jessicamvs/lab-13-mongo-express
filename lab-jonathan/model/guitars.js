let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let guitarSchema = Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
});

module.exports = mongoose.model('guitar', guitarSchema);
