'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('event', eventSchema);
