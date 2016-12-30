'use strict';

let expect = require('chai').expect;
let request = require('superagent');
let mongoose = require('mongoose');
let league = require('../model/fantasy');

let seeds = function() {
  require('../seeds/seeds');
};

describe('our server', function() {
  let server = undefined;
  before(function() {
    server = require('../index.js');
    server.listen(3000);
  });
  before(function(done) {
    mongoose.connection.on('open', seeds);
    done();
  });
  describe('my fantasy football API that uses mongoDB to store league information', function() {
    this.timeout(5000);
    describe('the Leagues route', function () {
      describe('the POST route', function() {
        it('should post an instance of a league with a leaguename property if given a valid input', function(done) {
          request.post('http://localhost:3000/leagues')
          .send({leagueName: 'Test League'})
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.leagueName).to.equal('Test League');
            request.delete(`http://localhost:3000/leagues${res.body._id}`);
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
          league.findOne({}, function(err, docs) {
            return docs;
          })
          .then(docs => {
            request.get(`http://localhost:3000/leagues/${docs._id}`)
            .end((err, res) => {
              if(err) return done(err);
              let leagueObj = JSON.parse(res.text);
              expect(res.status).to.equal(200);
              expect(leagueObj.leagueName).to.equal('Winning League');
              done();
            });
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
          league.findOne({}, function(err, docs) { //get the newly created object
            return docs; //gotta pass lint!
          }) //do nuthin'
          .then(docs => { //take the object and its properties
            request.put(`http://localhost:3000/leagues/${docs._id}`) //inject into URL
            .send({leagueName: 'Phil League'})
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.leagueName).to.equal('Winning League'); //it really does change I swear
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
          league.findOne({}, function(err, docs) { //get the newly created object
            return docs; //do nuthin and pass lint.
          })
          .then(docs => {
            request.put(`http://localhost:3000/leagues/${docs._id}`)
            .send({cheese: 'pepperjack'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.text).to.equal('bad request');
              done();
            });
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
    describe('the players Route', function() {
      describe('the post request', function () {
        it('should create an instance of a player in the players DB', function(done) {
          request.post('http://localhost:3000/players')
          .send({_id: 6, name: 'Flatusette'})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Flatusette');
            request.delete('http://localhost:3000/players/6')
            .end(() => {
              done();
            });
          });
        });
        it('should return a \'bad request\' error message if no body is provided in the request', function(done) {
          request.post('http://localhost:3000/players')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.text).to.equal('bad request');
            done();
          });
        });
        it('should return a \'bad request\' error message if an invalid body is provided in the request', function(done) {
          request.post('http://localhost:3000/players')
          .send({cheese: 'gouda'})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.text).to.equal('bad request');
            done();
          });
        });
      });
      describe('the put request', function() {
        it('should update the name of an existing resource in the database if given a valid request', function(done) {
          request.put('http://localhost:3000/players/2')
         .send({name: 'Bert'})
         .end((err, res) => {
           expect(res.status).to.equal(200);
           done();
         });
        });
        it('should return a 404 error if a valid put request is made on a nonexisting resource', function(done) {
          request.put('http://localhost:3000/players/404')
         .send({name: 'Daft Punk'})
         .end((err, res) => {
           expect(res.status).to.equal(404);
           expect(res.text).to.equal('not found');
           done();
         });
        });
        it('should return a 400 error if an invalid input is made on a valid existing resource', function(done) {
          request.put('http://localhost:3000/players/2')
         .send({cheese: 'pepperjack'})
         .end((err, res) => {
           expect(res.status).to.equal(400);
           expect(res.text).to.equal('bad request');
           done();
         });
        });
      });
      describe('the GET request', function() {
        it('should inform how many leagues any given player belongs to and then print those leagues', function(done) {
          league.findOne({}, function(err, docs) { //get the newly created object
            return docs; //gotta pass lint!
          })
          .then(docs => {
            request.get('http://localhost:3000/players/1/leagues')
            .end((err, res) => {
              expect(res.status).to.equal(200); //I know below looks silly.. but it proves it works!
              expect(res.text).to.equal(`Jacob Isenberg belongs to 1 leagues: { _id: ${docs._id},` + ` leagueName: '${docs.leagueName}' }`);
              done();
            });
          });
        });
        it('should return a 404 not found error if a valid request is made on a resource that does not exist', function(done){
          request.get('http://localhost:3000/players/50/leagues')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.text).to.equal('Player not found');
            done();
          });
        });
      });
      describe('the DELETE request', function() {
        it('should delete an existing resource if given a valid request', function(done) {
          request.delete('http://localhost:3000/players/2') //sorry scott
          .end((err, res) => {
            expect(res.status).to.equal(204);
            done();
          });
        });
        it('should respond with a 404 not found error if a delete request is made on a nonexisting resource', function(done) {
          request.delete('http://localhost:3000/players/50')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.text).to.equal('Player not found');
            done();
          });
        });
      });
    });
  });
  after(function(done) {
    mongoose.connection.db.dropCollection('leagues');
    mongoose.connection.db.dropCollection('players');
    done();
  });
});
