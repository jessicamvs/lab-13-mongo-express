'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = Schema({
  name: {type: String, required: true},
  mealType: {type: String, required: true},
  createDate: {type: Date},
  ingredients: {type: String},
  directions: {type: String},
  origin: {type: String, required:true}
});

module.exports = mongoose.model('recipe', recipeSchema); // look at later