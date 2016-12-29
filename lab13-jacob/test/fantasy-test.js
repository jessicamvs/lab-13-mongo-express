'use strict';

let expect = require('chai').expect;
let request = require('superagent');
let mongoose = require('mongoose');

describe('our server', function() {
  let server = undefined;
  before(function() {
    server = require('../index.js');
    server.listen(3000);
  });
  before(function(done) {
    mongoose.connection.on('open', done);
  });
  describe('my fantasy football API that uses mongoDB to store league information', function() {
    describe('the POST route', function() {
      it('should post an instance of a league with a leaguename property if given a valid input', function(done) {
        request.post('http://localhost:3000/leagues')
        .send({leagueName: 'Test League'})
        .end((err, res) => {
          console.log(err);
          if (err) return done(err);
          expect(res.status).to.equal(200);
          console.log(res.body);
          expect(res.body.leagueName).to.equal('Test League');
          done();
        });
      });
      it('should return a \'bad request\' error message if no body is provided in the request', function(done) {
        request.post('http://localhost:3000/leagues')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('bad request');
          done();
        });
      });
      it('should return a \'bad request\' error message if an invalid body is provided in the request', function(done) {
        request.post('http://localhost:3000/leagues')
        .send({cheese: 'gouda'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('bad request');
          done();
        });
      });
    });
    describe('the GET route', function() {
      it('should retrieve information from mongoDB based on express params', function(done) {
        request.get('http://localhost:3000/leagues/58645f0307701204cb8fe5e1')
        .end((err, res) => {
          if(err) return done(err);
          let leagueObj = JSON.parse(res.text);
          expect(res.status).to.equal(200);
          expect(leagueObj.leagueName).to.equal('Jacob League');
          done();
        });
      });
      it('should return a 404 error if a get request is made on a valid route but there is no matching field', function(done) {
        request.get('http://localhost:3000/leagues/cheese')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('ID not found');
          done();
        });
      });
    });
    describe('the PUT request', function() {
      it('should update the name of an existing resource in the database if given a valid request', function(done) {
        request.put('http://localhost:3000/leagues/58645f0307701204cb8fe5e1')
        .send({leagueName: 'Phil League'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          request.put('http://localhost:3000/leagues/58645f0307701204cb8fe5e1') //switching name back to original
          .send({leagueName: 'Jacob League'})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.leagueName).to.equal('Phil League'); //value DOES change, but timing doesn't work. GET test validates this.
            done();
          });
        });
      });
      it('should return a 404 error if a valid put request is made on a nonexisting resource', function(done) {
        request.put('http://localhost:3000/leagues/cheese')
        .send({leagueName: 'Cheddar League'})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('not found');
          done();
        });
      });
      it('should return a 400 error if an invalid input is made on a valid existing resource', function(done) {
        request.put('http://localhost:3000/leagues/585a1220d152412db2071d95')
        .send({cheese: 'pepperjack'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('bad request');
          done();
        });
      });
    });
    describe('the DELETE request', function() {
      it('should delete an existing resource if given a valid input', function(done) {
        request.post('http://localhost:3000/leagues')
        .send({leagueName: 'Delete Test'})
        .end((err, res) => {
          request.delete(`http://localhost:3000/leagues/${res.body._id}`)
          .end((err, res) => {
            expect(res.status).to.equal(204);
            done();
          });
        });
      });
      it('should send a 404 error if a delete request is made on a nonexisting resource', function(done) {
        request.delete(`http://localhost:3000/leagues/cheese`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('not found');
          done();
        });
      });
    });
  });
    // after(function() { //close() is challenging to do on Express these days.
    //   server.listen(8080, () => server.close());
});
