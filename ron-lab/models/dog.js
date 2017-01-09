'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let dogSchema = Schema({
  name: {type: String, required: true},
})

module.exports = mongoose.model('dog', dogSchema)
