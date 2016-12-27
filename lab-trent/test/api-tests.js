'use strict';

require('isomorphic-fetch');

const expect = require('chai').expect;

describe('MongoDB API', function() {
  let server = null;
  let testId = '';
  before(function() {
    server = require('../index.js');
    server = server.listen(3000);
  });

  describe('GET /events', function() {
    it('should send an array of resource ids that are in the data folder.', function(done) {
      fetch('http://localhost:3000/api/events').then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res instanceof Array).to.equal(true);
        done();
      });
    });
  });
  describe('POST /events', function() {
    it('should create a new statshot, add it to the resource manager and send back the object.', function(done) {
      fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:'Trent', description:'Recieved a drop!' }),
      }).then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res.username).to.equal('Trent');
        expect(res.description).to.equal('Recieved a drop!');
        testId = res._id;
        done();
      });
    });
  });
  describe('GET /events:id', function() {
    it('should return a 404 when an invalid id is given', function(done) {
      fetch('http://localhost:3000/api/events/50341373e894ad16347efe01').then(function(res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return the statshot posted above.', function(done) {
      fetch('http://localhost:3000/api/events/' + testId).then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res.username).to.equal('Trent');
        expect(res.description).to.equal('Recieved a drop!');
        done();
      });
    });
  });
  describe('DELETE /events:id', function() {
    it('should return with 200 status to signify deleted.', function(done) {
      fetch('http://localhost:3000/api/events/' + testId, { method: 'DELETE' }).then(function(res) {
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  after(function() {
    server.close();
  });
});
