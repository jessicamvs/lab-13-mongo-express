'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = require('./author.js');

let bookSchema = Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true}
});

module.exports = mongoose.model('book', bookSchema);
