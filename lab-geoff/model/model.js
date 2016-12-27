'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let albumSchema = Schema({
  title: { type : String, required: true}
});

module.exports = mongoose.model('Album', albumSchema);