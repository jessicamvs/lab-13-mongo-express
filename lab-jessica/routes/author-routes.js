'use strict';

const Router = require('express').Router;
const router = module.exports = new Router();

const Author = require('../models/author.js');


//  * pass data as stringified json in the body of a post request to create a resource
router.post('/authors', (req, res) => {
  new Author(req.body).save()
    .then(author => {
      res.json(author);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('bad request');
    });
});

//  * pass the id of a resource though the url endpoint to `req.params` to fetch a model
router.get('/authors/:id', (req, res) => {
  Author.findById(req.params.id)
    .populate('books')
    .exec((err, author) => {
      if (err) return res.status(404).send('not found' + '\n');
      res.json(author);
    });
});

//  * pass data as stringified json in the body of a put request to update a resource
router.put('/authors/:id', (req, res) => {
  Author.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(author => res.json(author))
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
});

//  * pass the id of a resource though the url endpoint to `req.params` to delete a model
router.delete('/authors/:id', (req, res) => {
  Author.remove({_id: req.params.id})
    .then(author => {
      res.status(204).json(author);
    })
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
});
