let expect = require('chai').expect;
let request = require('superagent').request;
let testLeague = '';

describe('our server', function() {
  let server = undefined;
  before(function() {
    server = require('../index.js');
    server.lisen(3000);
  });
  describe('my fantasy football API that uses mongoDB to store league information', function() {
    describe('the POST route', function() {
      it('should post an instance of a league with a leaguename property if given a valid input', function(done) {
        request.post('http://localhost:3000/leagues')
        .send({leagueName: 'Test League'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.leagueName).to.equal("Test League");
          testLeague = res.body;
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
          done()
        })
      })
    });
  });

  after(function() {
    server.close();
  });
});
