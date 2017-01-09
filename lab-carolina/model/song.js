'use strict';

// const uuid = require('node-uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
});

module.exports = mongoose.model('song', songSchema);
