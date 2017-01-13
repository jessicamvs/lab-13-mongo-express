'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = Schema({
  title: {type: String, required: true},
  authorID: {type: Schema.Types.ObjectId, ref: 'author'}
});

module.exports = mongoose.model('book', bookSchema);
