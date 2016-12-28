let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ownerSchema = Schema({
  name: {type: String, required: true},
  style: {type: String, required: true},
  listID: {type: mongoose.Schema.ObjectId, required: true},
});

module.exports = mongoose.model('owners', ownerSchema);
