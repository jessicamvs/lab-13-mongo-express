'use strict';

let mongoose = require('mongoose');

let albumSchema = mongoose.Schema({
  title: String,
  required: true
});

module.exports = mongoose.model('Album', albumSchema);