'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = Schema({
  title: {type: String, required: true},
  author: {type: String, require: true}
});

module.exports = mongoose.model('book', bookSchema);
