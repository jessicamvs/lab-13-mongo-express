let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');


describe('testing guitar rotues', function(){
  // let guitar = null;
  let owner = null
  before((done) => {
    console.log('waiting');
    setTimeout(() => {}, 10000);
    request.post('localhost:9000/owners')
       .send({name: 'OWNER NAME', style: 'OWNER STYLE', guitar: 'OWNER GUITAR'})
       .end((err, res) => {
         owner = res.body;
         done();
       });
  });
  it('should return 404 for an unregistered route', function(done) {
    request.get('http://localhost:9000/stuff')
    .end((err, res) => {
      console.log(err);
      console.log(res);
      expect(res.status).to.equal(404);
      done();
    });
  });


// test POST errors/messages
  describe('testing POST /owners for response 200', function(){
    it('should return an owner', function(done){
      request.post('localhost:9000/owners')
      // let owner = null;
      .send({name: 'OWNER NAME', style: 'OWNER STYLE', guitar: 'OWNER GUITAR'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('OWNER NAME');
        expect(res.body.style).to.equal('OWNER STYLE');
  //       // owner = res.body;
        done();
      });
    });
  //
    it('should responds with "bad request" for if no body provided or invalid body provided', function(done){
      request.post('localhost:9000/guitars/4')
      .send({make: 'fender'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


// testing GET errors/messages
  describe('testing GET /owners respones', function(){
    it('provided an id it should return a owner', function(done){
      request.get(`localhost:9000/owners/${owner.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('OWNER NAME');
        expect(res.body.style).to.equal('OWNER STYLE');
        owner = res.body;
        done();
      });
    });

    it('should return a 400 bad request error if no id was provided', function(done){
      request.get('localhost:9000/owners/')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return a 404 error if the id was not found' , function(done){
      request.get('localhost:9000/owners/lemmy')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        // expect(res.text).to.equal('Not Found');
        done();
      });
    });


  });

  describe('testing PUT /owners/:id', function(){
    it('should return an updated owner', function(done){
      request.put(`localhost:9000/owners/${owner.id}`)
      .send({name: 'OWNERNAME', style: 'OWNERSTYLE'})
      .end((err, res) => {
        // let body = JSON.parse(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('OWNERNAME');
        expect(res.body.style).to.equal('OWNERSTYLE');
        done();
      });
    });

    it('should responds with "bad request" for if no body provided', function(done){
      request.put(`localhost:9000/owners/${owner.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('Bad Request');
        done();
      });
    });

    it('should responds with "bad request" for if invalid body provided', function(done){
      request.put(`localhost:9000/owners/${owner.id}`)
      .send('45245234erwdfgadsf')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('Bad Request');
        done();
      });
    });
  });



//DELETE tests
  describe('testing DELETE /owners/:id', function(){
    it('should respond with 204 if there is no content in the response body', function(done){
      request.delete(`localhost:9000/owners/${owner.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });

    });

    it('should respond with 404 if a bad id is provided', function(done){
      request.delete('localhost:9000/owners/BADID')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should respond with 404 if no id is provided', function(done){
      request.delete('localhost:9000/owners')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });




//end of file
});










//delete tests
//DELETE - test 404, for a DELETE request with an invalid or missing id
// 404 for missing id because DELETE /api/<simple-resource-name>/ is not a route
// DELETE - test 204, with an empty response body for DELETE request with a valid id
