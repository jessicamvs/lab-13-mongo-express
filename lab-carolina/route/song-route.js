'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Song = require('../model/song.js');

const songRouter = module.exports = new Router();

songRouter.post('/api/song', jsonParser, function(req, res, next){
  new Song(req.body).save()
  .then(song => res.json(song))
  .catch(next);
});

songRouter.get('/api/song/:id', function(req, res, next){
  Song.findById(req.params.id)
  .then(song => res.json(song))
  .catch(next);
});
