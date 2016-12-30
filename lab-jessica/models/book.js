'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Author = require('./author.js');

let bookSchema = Schema({
  title: {type: String, required: true},
  authorID: {type: Schema.Types.ObjectId, ref: 'Author'}
});

module.exports = mongoose.model('book', bookSchema);
