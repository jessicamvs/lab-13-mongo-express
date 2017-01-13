'use strict';

const express = require('express');

const Value = require('../model/value');

const router = new express.Router();

router.get('/values', function(req, res, next) {
  Value.find()
  .then(statshots => res.json(statshots))
  .catch(next);
});

router.get('/values/:id', function(req, res, next) {
  Value.findById(req.params.id).populate('events')
  .then(function(value) {
    if (value) {
      res.json(value);
    } else {
      next({ status: 404, message: 'Value not found.' });
    }
  })
  .catch(next);
});

router.post('/values', function(req, res, next) {
  if (!req.body) return next({ status: 400, message: 'Expected body.' });
  if (!req.body.value) return next({ status: 400, message: 'Expected value.' });
  if (!req.body.event) return next({ status: 400, message: 'Expected eventId.' });
  new Value(req.body).save()
  .then(value => res.json(value))
  .catch(next);
});

router.put('/values/:id', function(req, res, next) {
  if (!req.body) return next({ status: 400, message: 'Expected body.' });
  if (!req.body.value) return next({ status: 400, message: 'Expected value.' });
  if (!req.body.event) return next({ status: 400, message: 'Expected eventId.' });
  Value.findById(req.params.id)
  .then(function(value) {
    if (!value) {
      next({ status: 404, message: 'Value not found.' });
    } else {
      value.value = req.body.value;
      value.event = req.body.event;
      value.save(function() {
        res.json(value);
      });
    }
  }).catch(next);
});

router.delete('/values/:id', function(req, res, next) {
  Value.findByIdAndRemove(req.params.id, function (err, value) {
    if(err) return next(err);
    if (!value) return next({ status: 404, message: 'Value not found.' });
    res.status(204).end();
  });
});

module.exports = router;
