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
router.put('/api/albums/:id', jsonParser, function(req, res, next) {
  Album.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then(album => {
    res.json(album);
  })
  .catch(next);
});
router.get('/api/albums/:id', jsonParser, function(req, res, next) {
  console.log(req.params.id);
  Album.findById(req.params.id)
  .then(album => {
    console.log(album);
    res.json(album);
  })
  .catch(next);
});
router.get('/api/albums', jsonParser, function(req, res, next) {
  Album.find()
  .then(albums => {
    res.json(albums);
  })
  .catch(next);
});
router.delete('/api/albums/:id', function(req, res, next) {
  Album.findByIdAndRemove(req.params.id)
  .then(album => {
    res.json(album);
  })
  .catch(next);
});

module.exports = router;