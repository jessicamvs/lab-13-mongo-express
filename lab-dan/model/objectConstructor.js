'use strict'

const uuid = require('node-uuid')

module.exports = function (name, breed) {
  this.id = uuid.v4()
  this.creationDate = new Date()
  this.name = name ? name : 'obj_' + this.id
  this.breed = breed ? breed : 'unknown'
}
