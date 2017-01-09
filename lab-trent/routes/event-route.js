'use strict';

const express = require('express');

const Event = require('../model/event');

const router = new express.Router();

router.get('/events', function(req, res, next) {
  Event.find()
  .then(statshots => res.json(statshots))
  .catch(next);
});

router.get('/events/:id', function(req, res, next) {
  Event.findById(req.params.id).populate('values')
  .then(function(event) {
    if (event) {
      res.json(event);
    } else {
      next({ status: 404, message: 'Event not found.' });
    }
  })
  .catch(next);
});

router.post('/events', function(req, res, next) {
  if (!req.body) return next({ status: 400, message: 'Expected body.' });
  if (!req.body.username) return next({ status: 400, message: 'Expected username.' });
  if (!req.body.description) return next({ status: 400, message: 'Expected description.' });
  new Event(req.body).save()
  .then(event => res.json(event))
  .catch(next);
});

router.put('/events/:id', function(req, res, next) {
  if (!req.body) return next({ status: 400, message: 'Expected body.' });
  if (!req.body.username) return next({ status: 400, message: 'Expected username.' });
  if (!req.body.description) return next({ status: 400, message: 'Expected description.' });
  Event.findById(req.params.id)
  .then(function(event) {
    if (!event) {
      next({ status: 404, message: 'Event not found.' });
    } else {
      event.username = req.body.username;
      event.description = req.body.description;
      event.save(function() {
        res.json(event);
      });
    }
  }).catch(next);
});

router.delete('/events/:id', function(req, res, next) {
  Event.findByIdAndRemove(req.params.id, function (err, event) {
    if(err) return next(err);
    if (!event) return next({ status: 404, message: 'Event not found.' });
    res.status(204).end();
  });
});

module.exports = router;
