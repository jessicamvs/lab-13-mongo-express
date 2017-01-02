
const request = require('superagent');
const expect = require('chai').expect;

const Author = require('../models/author.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

describe('testing book routes', function() {
  let server;
  let book;

  before(function(done) {
    server = app.listen(PORT, () => {
      console.log('started server from book tests');
    });
    new Author({name: 'TEST author for book tests'}).save()
      .then(exampleAuthor => {
        this.exampleAuthor = exampleAuthor;
      })
      .then(() => done())
      .catch(done);
  });

  describe('testing POST /api/authors/:authorID/books', function() {
    it('should return a book', function(done) {
      request.post(`localhost:3000/api/authors/${this.exampleAuthor._id}/books`)
      .send({title: 'How to Post'})
      .end((err, res) => {
        if (err) return done(err);
        book = res.body;
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('How to Post');
        done();
      });
    });

    // it('should respond with 400 error if no body is provided', function(done) {
    //   request.post(`localhost:3000/api/authors/${this.exampleAuthor._id}/books`)
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     expect(res.status).to.equal(400);
    //     done();
    //   });
    // });
  });

  describe('testing GET /api/books/:bookId', function() {
    it('should return a book and populate author given an id', function(done) {
      request.get(`localhost:3000/api/books/${book._id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(book.title);
        expect(res.body.authorID.name).to.equal(this.exampleAuthor.name);
        done();
      });
    });

    it('should return 404 for valid req with an id that was not found', function(done) {
      request.get('localhost:3000/api/books/7577')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found' + '\n');
        done();
      });
    });
  });

  describe('testing PUT /api/books/:bookId', function() {

    it('should respond with 200 if provided a valid body and should change document', function(done) {
      request.put(`localhost:3000/api/books/${book._id}`)
      .send({title: 'UPDATING TITLE'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('UPDATING TITLE');
        done();
      });
    });

  });

  describe('testing DELETE /api/authors/:authorId/books/:bookId', function() {
    it('should return 204 with no content in res.body when provided valid id', function(done) {
      request.delete(`localhost:3000/api/authors/${this.exampleAuthor._id}/books/${book._id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });
    });

    // it('should return 404 for valid req with an id that was not found', function(done) {
    //   request.delete(`localhost:3000/api/authors/${this.exampleAuthor._id}/books/987`)
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //     expect(res.body).to.equal('not found' + '\n');
    //     done();
    //   });
    // });
  });

  after(function(done) {
    server.close(() => {
      console.log('server closed after books tests');
    });
    done();
  });
});
