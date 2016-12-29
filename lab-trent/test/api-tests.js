'use strict';

require('isomorphic-fetch');

const expect = require('chai').expect;
const seed = require('../seeds/eventseed');

describe('MongoDB API', function() {
  let server = null;
  let testValue = null;
  before(function(done) {
    server = require('../index.js');
    server = server.listen(3000, function() {
      seed.seedDatabase(function(event) {
        testValue = event;
        done();
      });
    });
  });

  describe('Values Endpoints', function() {
    describe('GET /values', function() {
      it('should send an array of values that are in the database.', function(done) {
        fetch('http://localhost:3000/api/values').then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res instanceof Array).to.equal(true);
          done();
        });
      });
    });
    describe('POST /values', function() {
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/values', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value:5000000 }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should create a new value, add it to the database, and send back the object in json', function(done) {
        fetch('http://localhost:3000/api/values', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value:5000000, event: testValue.event }),
        }).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.value).to.equal(5000000);
          expect(res.event).to.equal(testValue.event);
          done();
        });
      });
    });
    describe('GET /values:id', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/values/50341373e894ad16347efe01').then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a valid event above.', function(done) {
        fetch('http://localhost:3000/api/values/' + testValue._id).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.value).to.equal(50000);
          expect(res.event).to.equal(testValue.event);
          done();
        });
      });
    });
    describe('PUT /values', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/values/50341373e894ad16347efe01', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value:520593, event: testValue.event }),
        }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/values/' + testValue._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: 90593 }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should find the previously added object, modify it, save it to the database, and return the edited object', function(done) {
        fetch('http://localhost:3000/api/values/' + testValue._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: 596823, event: testValue.event }),
        }).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.value).to.equal(596823);
          expect(res.description).to.equal(testValue.event);
          done();
        });
      });
    });
    describe('DELETE /values:id', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/values/50341373e894ad16347efe01', { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return with 204 status to signify deleted.', function(done) {
        fetch('http://localhost:3000/api/values/' + testValue._id, { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });
  describe('Events Endpoints', function() {
    describe('GET /events', function() {
      it('should send an array of events that are in the database.', function(done) {
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
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description:'Recieved a drop!' }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should create a new event, add it to the database, and send back the object in json', function(done) {
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
      it('should return the event posted above.', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.username).to.equal('Trent');
          expect(res.description).to.equal('Recieved a drop!');
          done();
        });
      });
    });
    describe('PUT /events', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/events/50341373e894ad16347efe01', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:'Trent', description:'Recieved a drop edited!' }),
        }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description:'Recieved a drop!' }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should find the previously added object, modify it, save it to the database, and return the edited object', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:'Tront', description:'Recieved a drop edited!' }),
        }).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.username).to.equal('Tront');
          expect(res.description).to.equal('Recieved a drop edited!');
          done();
        });
      });
    });
    describe('DELETE /events:id', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/events/50341373e894ad16347efe01', { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return with 204 status to signify deleted.', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });

  describe('Events Endpoints', function() {
    describe('GET /events', function() {
      it('should send an array of events that are in the database.', function(done) {
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
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description:'Recieved a drop!' }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should create a new event, add it to the database, and send back the object in json', function(done) {
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
      it('should return the event posted above.', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.username).to.equal('Trent');
          expect(res.description).to.equal('Recieved a drop!');
          done();
        });
      });
    });
    describe('PUT /events', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/events/50341373e894ad16347efe01', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:'Trent', description:'Recieved a drop edited!' }),
        }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a 400 when an invalid body is given', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description:'Recieved a drop!' }),
        }).then(function(res) {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should find the previously added object, modify it, save it to the database, and return the edited object', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:'Tront', description:'Recieved a drop edited!' }),
        }).then(function(res) {
          expect(res.status).to.equal(200);
          return res.json();
        }).then(function(res) {
          expect(res.username).to.equal('Tront');
          expect(res.description).to.equal('Recieved a drop edited!');
          done();
        });
      });
    });
    describe('DELETE /events:id', function() {
      it('should return a 404 when an invalid id is given', function(done) {
        fetch('http://localhost:3000/api/events/50341373e894ad16347efe01', { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return with 204 status to signify deleted.', function(done) {
        fetch('http://localhost:3000/api/events/' + testValue.event, { method: 'DELETE' }).then(function(res) {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });

  after(function() {
    server.close();
  });
});
