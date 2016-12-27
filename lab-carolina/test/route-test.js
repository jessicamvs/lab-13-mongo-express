// 'use strict';
//
// const request = require('superagent');
// const expect = require('chai').expect;
//
// require('../server.js');
//
// describe('testing song routes', function(){
//   var song = null;
//
//   describe('testing unregistered routes', function(){
//     it('should return a status of 404', function(done){
//       request.get('localhost:3000/api/books')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.text).to.equal('Cannot GET /api/books\n');
//         expect(err).to.not.equal(null);
//         done();
//       });
//     });
//
//     //post
//     describe('test POST /api/song', function(){
//       it('should return a song', function(done){
//         request.post('localhost:3000/api/song')
//         .send({title: 'stuff', artist: 'tay'})
//         .end((err, res) => {
//           if(err) return done(err);
//           expect(res.status).to.equal(200);
//           expect(res.body.title).to.equal('stuff');
//           expect(res.body.artist).to.equal('tay');
//           song = res.body;
//           done();
//         });
//       });
//     });
//
//     it('should return a 400 error for bad object passing', function(done){
//       request.post('localhost:3000/api/song')
//       .send({title: 'stuff', type: 'pop'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   });
//
//   it('should return a 400 error for no object', function(done){
//     request.post('localhost:3000/api/song')
//     .end((err, res) => {
//       expect(res.status).to.equal(400);
//       expect(res.text).to.equal('bad request');
//       expect(err).to.not.equal(null);
//       done();
//     });
//   });
//
//   //get
//   describe('testing GET /api/song', function(){
//     it('should return a song', function(done){
//       request.get(`localhost:3000/api/song/${song.id}`)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body.title).to.equal('stuff');
//         expect(res.body.artist).to.equal('tay');
//         done();
//       });
//     });
//
//     it('should have a return status of 404', function(done){
//       request.get(`localhost:3000/api/song/10`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.text).to.equal('not found');
//         expect(err).to.not.equal(null);
//         done();
//       });
//     });
//
//     it('should have a return status of 404', function(done){
//       request.get('localhost:3000/api/song')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.text).to.equal('Cannot GET /api/song\n');
//         expect(err).to.not.equal(null);
//         done();
//       });
//     });
//   });
//
// //put
//   describe('testing PUT /api/song', function(){
//     it('should return a status of 200', function(done){
//       request.put(`localhost:3000/api/song/${song.id}`)
//       .send({title: 'new', artist:'different'})
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.title).to.equal('new');
//         expect(res.body.artist).to.equal('different');
//         done();
//       });
//     });
//
//     it('should return a status of 400 for invalid body', function(done){
//       request.put(`localhost:3000/api/song/${song.id}`)
//       .send('hi')
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.text).to.equal('bad request');
//         done();
//       });
//     });
//
//     it('should return a status of 400 for no body', function(done){
//       request.put(`localhost:3000/api/song/${song.id}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.text).to.equal('bad request');
//         done();
//       });
//     });
//
//     //delete
//     describe('testing DELETE /api/song', function(){
//       it('should return 404 for invalid id', function(done){
//         request.delete(`localhost:3000/api/song/<unique ID>`)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.text).to.equal('not found');
//           done();
//         });
//       });
//
//       it('should return 404 for missing id', function(done){
//         request.delete(`localhost:3000/api/song`)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.text).to.equal('Cannot DELETE /api/song\n');
//           done();
//         });
//       });
//
//       it('should return 204 with no response for a delete request with valid id', function(done){
//         request.delete(`localhost:3000/api/song/${song.id}`)
//         .end((err, res) => {
//           expect(res.status).to.equal(204);
//           expect(res.text).to.equal('');
//           done();
//         });
//       });
//
//     });
//
//
//
//
//   });
// });
