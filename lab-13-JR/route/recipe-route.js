'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Recipe = require('../model/recipe');

const recipeRouter = module.exports = new Router();

recipeRouter.post('/api/recipe', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  console.log(req.body);
  new Recipe(req.body).save()//returns a promise
  .then(recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.get('/api/recipe/:id', function(req, res, next) {
  Recipe.findById(req.params.id)
  .then(recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.get('/api/recipe', function(req, res, next) {
  Recipe.find().toArray() //this is happening synchronously and toArray is trying to work with something that isn't done yet. Promisify, or use toArray() as a cb function?
  .then(recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.put('/api/recipe/:id', jsonParser, function(req, res, next) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.delete('/api/recipe/:id', function(req, res, next) {
  Recipe.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
