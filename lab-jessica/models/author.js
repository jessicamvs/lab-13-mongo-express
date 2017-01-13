'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = Schema({
  name: {type: String, required: true},
  books: [{type: Schema.Types.ObjectId, ref: 'book'}]
});

module.exports = mongoose.model('author', authorSchema);
