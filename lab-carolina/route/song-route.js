'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Song = require('../model/song.js');

const songRouter = module.exports = new Router();

songRouter.post('/api/song', jsonParser, function(req, res, next){
  new Song(req.body).save()
  .then(song => res.json(song))
  .catch(err => next(createError(400, err.message)));
});

songRouter.get('/api/song/:id', function(req, res, next){
  Song.findById(req.params.id)
  .then(song => res.json(song))
  .catch(err => next(createError(404, err.message)));
});

songRouter.put('/api/song/:id', jsonParser, function(req, res, next){
  Song.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(song => res.json(song))
  .catch(err => next(createError(400, err.message)));
});

songRouter.delete('/api/song/:id', function(req, res, next){
  Song.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});
