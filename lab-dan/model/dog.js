'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let dogSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: 'unknown'
  },
  breed: {
    type: String,
    default: 'unknown'
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'owners',
  //   required: true
  // },
})

module.exports = mongoose.model('dog', dogSchema)
