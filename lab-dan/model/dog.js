'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

let dogSchema = new Schema ({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'owner',
    required: true
  },
})


module.exports = mongoose.model('dog', dogSchema)

// to deal with circular dependencies in this code, the require and exports are flipped
// see: https://coderwall.com/p/myzvmg/circular-dependencies-in-node-js

// this event listener removes reference to the dog from the owner schema when dog is deleted
dogSchema.pre('remove', function (next) {
  Owner.findOneAndUpdate({_id: this.owner}, {$pull: {pets: this.id}}, next)
})

const Owner = require ('./owner')
