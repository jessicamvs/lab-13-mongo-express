'use strict';

const Router = require('express').Router;

const Book = require('../models/book.js');
const Author = require('../models/author.js');
const router = module.exports = new Router();

//  * pass data as stringified json in the body of a post request to create a resource
router.post('/authors/:authorId/books', (req, res) => {
  Author.findById(req.params.authorId)
    .then(author => {
      req.body.authorID = author._id;
      this.tempAuthor = author;
      return new Book(req.body).save();
    })
    .then(book => {
      this.tempAuthor.books.push(book._id);
      this.tempAuthor.save();
      res.json(book);
    })
    .catch(err => {
      console.error(err);
      res.status(404);
    });
});

// //  * pass the id of a resource though the url endpoint to `req.params` to fetch a model
// router.get('/books/:id', (req, res) => {
//   Book.findById(req.params.id)
//     .then(book => res.json(book))
//     .catch(err => {
//       console.error(err);
//       res.status(404).send('not found');
//     });
// });
//
// //  * pass data as stringified json in the body of a put request to update a resource
// router.put('/books/:id', (req, res) => {
//   Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
//     .then(book => res.json(book))
//     .catch(err => {
//       console.error(err);
//       res.status(404).send('not found');
//     });
// });
//
// //  * pass the id of a resource though the url endpoint to `req.params` to delete a model
// router.delete('/books/:id', (req, res) => {
//   Book.remove({_id: req.params.id})
//     .then(book => {
//       res.status(204).json(book);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(404).send('not found');
//     });
// });
