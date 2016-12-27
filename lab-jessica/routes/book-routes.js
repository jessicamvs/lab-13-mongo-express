'use strict';

const Router = require('express').Router;

const Book = require('../models/book.js');
const router = module.exports = new Router();

// ### `/api/model-name`
// * `POST` request
//  * pass data as stringified json in the body of a post request to create a resource
router.post('/books', (req, res, next) => {
  new Book(req.body).save()
    .then(book => {
      console.log(book);
      res.json(book);
    })
    .catch(next);
});

// ### `/api/model-name/:id`
// * `GET` request
//  * pass the id of a resource though the url endpoint to `req.params` to fetch a model
router.get('/books/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(next);
});

// * `PUT` request
//  * pass data as stringified json in the body of a put request to update a resource
router.put('/books/:id', (req, res, next) => {
  Book.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(book => res.json(book))
    .catch(next);
});

// * `DELETE` request
//  * pass the id of a resource though the url endpoint to `req.params` to delete a model
router.delete('/books/:id', (req, res, next) => {
  Book.remove({_id: req.params.id})
    .then(book => res.json(book))
    .catch(next);
});
