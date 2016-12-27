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
  Event.findById(req.params.id)
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
  new Event(req.body).save()
  .then(event => res.json(event))
  .catch(next);
});

router.put('/events', function(req, res, next) {
  Event.findById(req.body.id)
  .then(function(event) {
    if (!event) {
      next({ status: 404, message: 'Event not found.' });
    }
    event.username = req.body.username;
    event.stats = req.body.stats;
    event.save().then(res.json(event));
  }).catch(next);
});

router.delete('/events/:id', function(req, res, next) {
  Event.remove({ _id: req.params.id }).then(res.status(204).end()).catch(next);
});

module.exports = router;
