'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

let ownerSchema = new Schema ({
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
    ref: 'dog'
  }],
})

module.exports = mongoose.model('owner', ownerSchema)

// to deal with circular dependencies in this code, the require and exports are flipped
// see: https://coderwall.com/p/myzvmg/circular-dependencies-in-node-js

// this event listener removes all related dogs when an owner is deleted, like SQL cascade delete
ownerSchema.pre('remove', function (next) {
  if (this.pets.length) {
    Dog.remove({owner: this._id})
    .then(() => next())
    .catch(next)
  }
})

const Dog = require ('./dog')
