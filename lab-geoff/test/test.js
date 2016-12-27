'use strict';

let expect = require('chai').expect;
let request = require('superagent');
let app = require('../server.js');

describe('albumRoutes.js', function() {
  let server = undefined;
  let id = null;
  before(function() {
    server = app.listen(3000, () => {
      console.log('server up');
    });
  });
  describe('.post()', function() {
    it('should add a new album to the db', function(done) {
      request.post('http://localhost:3000/api/albums')
      .send({title: 'test title'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body);
        id = res.body._id;
        done();
      });
    });
  });
  describe('.get() /albums', function() {
    it('should return all albums in db', function(done) {
      request.get('http://localhost:3000/api/albums')
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body);
        console.log(res.body);
        done();
      });
    });
  });
  describe('.get() /albums/:id', function() {
    it('should return a specific album', function(done) {
      console.log(id);
      request.get(`http://localhost:3000/api/albums/:${id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body);
        console.log(res.body);
        done();
      });
    });
  });
  after(function() {
    console.log('server close');
    server.close();
  });
});