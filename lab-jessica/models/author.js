'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = require('./book.js');

let authorSchema = Schema({
  name: {type: String, required: true},
  book: [{type: Schema.Types.ObjectId, ref: 'Book', required: true}]
});

module.exports = mongoose.model('author', authorSchema);
