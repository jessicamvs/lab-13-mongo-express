'use strict';

const Router = require('express').Router;

const Book = require('../models/book.js');
const router = module.exports = new Router();

//  * pass data as stringified json in the body of a post request to create a resource
router.post('/books', (req, res) => {
  new Book(req.body).save()
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('bad request');
    });
});

router.get('/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => {
      console.log(err);
      res.status(400);
    });
});

//  * pass the id of a resource though the url endpoint to `req.params` to fetch a model
router.get('/books/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
});

//  * pass data as stringified json in the body of a put request to update a resource
router.put('/books/:id', (req, res) => {
  Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(book => res.json(book))
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
});

//  * pass the id of a resource though the url endpoint to `req.params` to delete a model
router.delete('/books/:id', (req, res) => {
  Book.remove({_id: req.params.id})
    .then(book => {
      res.status(204).json(book);
    })
    .catch(err => {
      console.error(err);
      res.status(404).send('not found');
    });
});
