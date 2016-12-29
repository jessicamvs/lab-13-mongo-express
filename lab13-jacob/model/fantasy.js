'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fantasySchema = Schema ({
  leagueName: {type: String, required: true},
  creator: [{ type: Number, ref: 'player'}] //jim._id
});

module.exports = mongoose.model('league', fantasySchema);
