'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Book = require('./book.js');

let authorSchema = Schema({
  name: {type: String, required: true},
  books: [{type: Schema.Types.ObjectId, ref: 'book'}]
});

module.exports = mongoose.model('Author', authorSchema);
