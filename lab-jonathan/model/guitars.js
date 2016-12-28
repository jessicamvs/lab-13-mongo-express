let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let createError = require('http-errors');

let Owner = require('./owners.js');

let guitarSchema = Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  guitar: [{type: Schema.Types.ObjectID, ref: 'guitar'}],
});

let Guitar = module.exports = mongoose.model('guitar', guitarSchema);

Guitar.findByIdAndAddGuitar = function(id, guitar){
  return Guitar.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(guitar => {
    owners.listID = guitar._id;
    this.tempGuitar = guitar;
    return new Owner(owners).save();
  })
  .then(owner => {
    this.tempGuitar.guitars.push(guitar._id);
    this.tempOwner = owner;
    return this.tempGuitar.save();
  })
  .then( () => {
    return this.tempOwner;
  });
};
