'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId; Necessary?
//so we don't have to type out mongoose.Schema over and over again
//we want to export a model(constructor)

const recipeSchema = Schema({
  name: {type: String, required: true}, //name property and type string;
  //name is REQUIRED since we made it required.
  region: String,
  // id: ObjectId(),
  ingredientsRef: [{type: mongoose.Schema.ObjectId, ref: 'ingredient'}]
});

module.exports = mongoose.model('recipe', recipeSchema);
