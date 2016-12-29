'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Book = require('../models/book.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

describe('testing book routes', function() {

  let server;

  before(function(done){
    server = app.listen(PORT, function() {
      console.log('started server from tests');
    });
    new Book({title: 'TEST TITLE', author: 'TEST AUTHOR'}).save()
      .then(exampleBook => {
        console.log('exampleBook', exampleBook);
        this.exampleBook = exampleBook;
      })
      .then( () => done())
      .catch(done);
  });






  describe('testing unregistered routes', function() {

    it('should return 404 for unregistered get route', function(done) {
      request.get('localhost:3000/blah')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  });






  describe('testing POST /api/books', function() {

    // POST - test 200, response body like {<data>} for a post request with a valid body
    it('should return a book', function(done) {
      request.post('localhost:3000/api/books')
      .send({title: 'BOOK NAME', author: 'AUTHOR NAME'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('BOOK NAME');
        expect(res.body.author).to.equal('AUTHOR NAME');
        done();
      });
    });

    // POST - test 400, responds with 'bad request' if no body provided
    // it('should respond with 400 error if no body is provided', function(done) {
    //   request.post('localhost:3000/api/books')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });

    // POST - test 400, responds with 'bad request' if invalid body provided
    // it('should respond with 400 error if invalid body is provided', function(done) {
    //   request.post('localhost:3000/api/books')
    //   .send('lolololololol')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });

  });






  describe('testing GET /api/books', function() {

    // GET - test 200, response body like {<data>} for a request made with a valid id
    it('should return a book given an id', function(done) {
      request.get(`localhost:3000/api/books/${this.exampleBook._id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(`${this.exampleBook.title}`);
        expect(res.body.author).to.equal(`${this.exampleBook.author}`);
        done();
      });
    });

    // GET - test 404, responds with 'not found' for valid request made with an id that was not found
    // it('should return 404 for valid req with an id that was not found', function(done) {
    //   request.get('localhost:3000/api/books/6789')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //     done();
    //   });
    // });

  });





  describe('testing PUT /api/books', function() {

    // PUT - test 200, response body like {<data>} for a post request with a valid body
    it('should respond with 200 for a put with a valid body and should change document', function(done) {
      request.put(`localhost:3000/api/books/${this.exampleBook._id}`)
      .send({title: 'CHANGED TITLE', author: 'CHANGED AUTHOR'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('CHANGED TITLE');
        expect(res.body.author).to.equal('CHANGED AUTHOR');
        done();
      });
    });

    // PUT - test 400, responds with 'bad request' if no body provided
    // it('should respond with 400 along with \'bad request\' if no body provided', function(done) {
    //   request.put(`localhost:3000/api/books/${this.exampleBook._id}`)
    //   .end((err, res) => {
    //     // expect(res.status).to.equal(400);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });

    // PUT - test 400, responds with 'bad request' for invalid body
    // it('should respond with 400 along with \'bad request\' if invalid body provided', function(done) {
    //   request.put(`localhost:3000/api/books/${this.exampleBook._id}`)
    //   .send('lololol')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });

    // PUT - test 404, responds with 'not found' for valid request made with an id that was not found
    // it('should respond with 404 for valid request with an id that was not found', function(done) {
    //   request.put('localhost:3000/api/books/2')
    //   .send({title: 'CHANGED TITLE', author: 'CHANGED AUTHOR'})
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });

  });




  

  describe('testing DELETE /api/books/:id', function() {

  // DELETE - test 204, with no body, for a request with a valid id
  //   it('should respond with 204 with no content in the body when passed a valid id', function(done) {
  //     request.delete(`localhost:3000/api/books/${this.exampleBook._id}`)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(204);
        // expect(res.body).to.deep.equal({});
  //       done();
  //     });
  //   });

  // DELETE - test 404, responds with 'not found' for valid request made with an id that was not found
    // it('should respond with 404 along with \'not found\' for valid req with an id that was not found', function(done) {
    //   request.delete('localhost:3000/api/books/7')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //     expect(res.text).to.equal('not found');
    //     done();
    //   });
    // });

  });

  after(function(done) {
    server.close(function() {
      console.log('server closed after tests');
    });
    done();
  });

});
