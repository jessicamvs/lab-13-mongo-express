'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valueSchema = Schema({
  value: { type: Number, required: true },
  event: { type: Schema.Types.ObjectId, ref: 'event' },
});

module.exports = mongoose.model('value', valueSchema);
