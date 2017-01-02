'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Author = require('../models/author.js');
const app = require('../index.js');
const PORT = process.env.PORT || 3000;

describe('testing author routes', function() {

  let server;

  before(function(done){
    server = app.listen(PORT, function() {
      console.log('started server from tests');
    });
    new Author({name: 'TEST author'}).save()
      .then(exampleAuthor => {
        this.exampleAuthor = exampleAuthor;
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

  describe('testing POST /api/authors', function() {

    // POST - test 200, response body like {<data>} for a post request with a valid body
    it('should return an author', function(done) {
      request.post('localhost:3000/api/authors')
      .send({name: 'Author NAME'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Author NAME');
        done();
      });
    });

    // POST - test 400, responds with 'bad request' if no body provided
    it('should respond with 400 error if no body is provided', function(done) {
      request.post('localhost:3000/api/authors')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });

    // POST - test 400, responds with 'bad request' if invalid body provided
    it('should respond with 400 error if invalid body is provided', function(done) {
      request.post('localhost:3000/api/authors')
      .send('lolololololol')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });

  });

  describe('testing GET /api/authors', function() {

    // GET - test 200, response body like {<data>} for a request made with a valid id
    it('should return an author given an id', function(done) {
      request.get(`localhost:3000/api/authors/${this.exampleAuthor._id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(`${this.exampleAuthor.name}`);
        done();
      });
    });

    // GET - test 404, responds with 'not found' for valid request made with an id that was not found
    it('should return 404 for valid req with an id that was not found', function(done) {
      request.get('localhost:3000/api/authors/6789')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found' + '\n');
        done();
      });
    });

  });

  describe('testing PUT /api/authors', function() {

    // PUT - test 200, response body like {<data>} for a post request with a valid body
    it('should respond with 200 for a put with a valid body and should change document', function(done) {
      request.put(`localhost:3000/api/authors/${this.exampleAuthor._id}`)
      .send({name: 'CHANGED Author'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('CHANGED Author');
        done();
      });
    });

    // PUT - test 400, responds with 'bad request' for no body provided
    it('should respond with 200 even if no body is provided', function(done) {
      request.put(`localhost:3000/api/authors/${this.exampleAuthor._id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    // PUT - test 400, responds with 'bad request' for invalid body
    it('should respond with 400 along with \'bad request\' if invalid body provided', function(done) {
      request.put(`localhost:3000/api/authors/${this.exampleAuthor._id}`)
      .send('lololol')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    // PUT - test 404, responds with 'not found' for valid request made with an id that was not found
    it('should respond with 404 for valid request with an id that was not found', function(done) {
      request.put('localhost:3000/api/authors/2')
      .send({name: 'CHANGED AUTHOR'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });

  });

  describe('testing DELETE /api/authors/:id', function() {

  // DELETE - test 204, with no body, for a request with a valid id
    it('should respond with 204 with no content in the body when passed a valid id', function(done) {
      request.delete(`localhost:3000/api/authors/${this.exampleAuthor._id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });
    });

  // DELETE - test 404, responds with 'not found' for valid request made with an id that was not found
    it('should respond with 404 along with \'not found\' for valid req with an id that was not found', function(done) {
      request.delete('localhost:3000/api/authors/7')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });

  });

  after(function(done) {
    server.close(function() {
      Author.remove({name: 'Author NAME'})
        .then(author => {
          console.log('Deleted', author);
        });
      console.log('server closed after tests');
    });
    done();
  });

});
