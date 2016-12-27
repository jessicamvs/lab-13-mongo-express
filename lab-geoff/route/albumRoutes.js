'use strict';

let jsonParser = require('body-parser').json();
let Router = require('express').Router;

let Album = require('../model/model.js');
let router = new Router();

router.post('/api/albums', jsonParser, function(req, res, next) {
  new Album(req.body).save()
  .then(album => {
    res.json(album);
  })
  .catch(next);
});
router.put('/albums/:id', function(req, res, next) {
  //update existing model
});
router.get('/albums/:id', function(req, res, next) {
  //return a specific model
});
router.get('/api/albums', jsonParser, function(req, res, next) {
  Album.find()
  .then(albums => {
    res.json(albums);
  })
  .catch(next);
});
router.delete('/albums/:id', function(req, res, next) {
  //remove a specific model
});

module.exports = router;