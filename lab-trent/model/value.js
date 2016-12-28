'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valueSchema = Schema({
  value: { type: Number, required: true },
  eventId: { type: Schema.ObjectId, required: true },
});

module.exports = mongoose.model('value', valueSchema);
