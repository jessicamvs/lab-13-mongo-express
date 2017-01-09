'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let playerSchema = Schema ({
  _id: {type: Number},
  name: {type: String},
  leagues: [{type: Schema.Types.ObjectId, ref: 'league'}]
});

module.exports = mongoose.model('player', playerSchema);
