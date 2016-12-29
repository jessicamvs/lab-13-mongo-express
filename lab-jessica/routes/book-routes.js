'use strict';

const Router = require('express').Router;

const Book = require('../models/book.js');
const router = module.exports = new Router();

//  * pass data as stringified json in the body of a post request to create a resource
router.post('/books', (req, res, next) => {
  new Book(req.body).save()
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

//  * pass the id of a resource though the url endpoint to `req.params` to fetch a model
router.get('/books/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(next);
});

//  * pass data as stringified json in the body of a put request to update a resource
router.put('/books/:id', (req, res, next) => {
  Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(book => res.json(book))
    .catch(next);
});

//  * pass the id of a resource though the url endpoint to `req.params` to delete a model
router.delete('/books/:id', (req, res, next) => {
  Book.remove({_id: req.params.id})
    .then(book => res.json(book))
    .catch(next);
});
