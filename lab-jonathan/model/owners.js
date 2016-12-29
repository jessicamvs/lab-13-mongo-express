let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ownerSchema = Schema({
  name: {type: String, required: true},
  style: {type: String, required: true},
  guitar: [{type: mongoose.Schema.ObjectId, ref: 'guitars'}],
});

module.exports = mongoose.model('owners', ownerSchema);
