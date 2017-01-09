'use strict';

const Router = require('express').Router;
const ingredientRouter = module.exports = new Router();
const jsonParser = require('body-parser').json();
const Ingredient = require('../model/ingredient');
const Recipe = require('../model/recipe');

ingredientRouter.get('/api/ingredient/:id', (req, res, next) => {
  Ingredient.findById(req.params.id)
  .then(ingredient => res.send(ingredient))
  .catch(err => next(err));
});

ingredientRouter.post('/api/recipe/:id/ingredient', jsonParser, (req, res, next) => {
  let newIngredient;
  new Ingredient(req.body).save()
  .then(ingredient => {
    newIngredient = ingredient;
    return Recipe.findById(req.params.id);
  })
  .then(recipe => {
    recipe.ingredientsRef.push(newIngredient._id);
    return recipe.save();
  })
  .then(newIngredient => res.send(newIngredient))
  .catch(err => next(err));
});

ingredientRouter.delete('/api/recipe/:recipeId/ingredient/:ingredientId', (req, res, next) => {
  Recipe.findById(req.params.recipeId)
  .then(recipe => {
    console.log(recipe);
    let ingredientIndex = recipe.ingredientsRef.indexOf(req.params.ingredientId);
    console.log(ingredientIndex);
    recipe.ingredientsRef.splice(ingredientIndex, 1);
    return recipe.save();
  })
  .then(() => {
    return Ingredient.remove({_id: req.params.ingredientId});
    // Ingredient.findOneAndRemove({_id: req.params.ingredientId}); WHY NO WORKY!? isn't this the same as Ingredient.remove(id : obj.idProp)?
  })
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

ingredientRouter.put('/api/ingredient/:id', jsonParser, (req, res, next) => {
  Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(newIngredient => res.send(newIngredient))
  .catch(err => next(err));
});
