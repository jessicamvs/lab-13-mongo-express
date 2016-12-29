'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ownerSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'dogs'
  }],
})

module.exports = mongoose.module('owner', ownerSchema)
