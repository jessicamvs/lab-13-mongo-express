'use strict'

const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')
const ObjectId = require('mongoose').Types.ObjectId

const app = require('../index.js')
let server = undefined

chai.use(chaiHttp)

describe('Dog API - dog & owner routes', function() {
  let testDogID1 = ''
  let testDogID2 = ''
  let testOwnerID1 = ''
  let testOwnerID2 = ''

  before(function(done) {
    server = app.listen(3000, () => {
      console.log('Test Server started on port 3000')
      done()
    })
  })

  describe('GET routes', function() {
    it('should get a 200 response with a correct object for a GET request to \'/\'', function(done) {
      chai.request(app)
      .get('/')
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(res).to.have.status(200)
        expect(data.msg).to.equal('Hello, world! This is the amazing owner & dogs api')
        done()
      })
    })

    it('should get a 200 response with seeds for a GET request to /dogs', function(done) {
      chai.request(app)
      .get('/dogs')
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(res).to.have.status(200)
        expect(data.length).to.equal(5)
        done()
      })
    })

    it('should get a 200 response with seeds for a GET request to /owners', function(done) {
      chai.request(app)
      .get('/owners')
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(res).to.have.status(200)
        expect(data.length).to.equal(3)
        done()
      })
    })

    it('should get a 422 response for a GET request to \'/dogs/improperid\'', function(done) {
      chai.request(app)
      .get('/dogs/improperid')
      .end(function(err, res) {
        expect(res).to.have.status(422)
        done()
      })
    })

    it('should get a 422 response for a GET request to \'/owners/improperid\'', function(done) {
      chai.request(app)
      .get('/owners/improperid')
      .end(function(err, res) {
        expect(res).to.have.status(422)
        done()
      })
    })

    it('should get a 200 response with null for a GET request to \'/dogs/:id\' with a nonexistent id', function(done) {
      let newId = new ObjectId()
      chai.request(app)
      .get(`/dogs/${newId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.text).to.equal('null')
        done()
      })
    })

    it('should get a 200 response with null for a GET request to \'/owners/:id\' with a nonexistent id', function(done) {
      let newId = new ObjectId()
      chai.request(app)
      .get(`/owners/${newId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.text).to.equal('null')
        done()
      })
    })
  })

  describe('POST routes', function() {
    it('should get a 201 response with a correct object for a POST request to \'/owners\'', function(done) {
      let testName = 'OwnerName'
      chai.request(app)
      .post('/owners')
      .send({name: testName})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testOwnerID1 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        expect(data.pets).to.be.empty
        done()
      })
    })

    it('should get a 201 response with a correct object for a POST request to \'/dogs\'', function(done) {
      let testName = 'DogName'
      let testBreed = 'DogBreed'
      chai.request(app)
      .post('/dogs')
      .send({name: testName, breed: testBreed, owner: testOwnerID1})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testDogID1 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        expect(data.breed).to.equal(testBreed)
        expect(data.owner).to.equal(testOwnerID1)
        done()
      })
    })
  })

  describe('PUT requests', function() {
    it('should properly update and return an object for a PUT request to \'/owners\'', function(done) {
      let testName = 'UpdateOwnerName'
      chai.request(app)
      .put('/owners')
      .send({id: testOwnerID1, name: testName})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        done()
      })
    })

    it('should properly update and return an object for a PUT request to \'/dogs\'', function(done) {
      let testName = 'UpdateDogName'
      let testBreed = 'UpdateBreed'
      chai.request(app)
      .put('/dogs')
      .send({id: testDogID1, name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        expect(data.breed).to.equal(testBreed)
        done()
      })
    })

    it('should properly create a new object if an ID does not exist for a PUT request to \'/owners\'', function(done) {
      let testName = 'UpdateOwnerName2'
      let newId = new ObjectId()
      chai.request(app)
      .put('/dogs')
      .send({id: newId, name: testName})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testOwnerID2 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        expect(data.pets).to.empty
        done()
      })
    })

    it('should properly create a new object if an ID does not exist for a PUT request to \'/dogs\'', function(done) {
      let testName = 'UpdateDogName2'
      let testBreed = 'UpdateBreed2'
      let newId = new ObjectId()
      chai.request(app)
      .put('/dogs')
      .send({id: newId, name: testName, breed: testBreed, owner: testOwnerID2})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testDogID2 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.equal(testName)
        expect(data.breed).to.equal(testBreed)
        expect(data.owner).to.equal(testOwnerID2)
        done()
      })
    })
  })

  describe('DELETE routes', function() {
    it('should properly delete a dog object and return a 204 status for a DELETE request to \'/dogs/:id\'', function(done) {
      chai.request(app)
      .del(`/dogs/${testDogID1}`)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
    })
    //
    // it('should properly cascade delete the pet reference from the related owner', function(done) {
    //   chai.request(app)
    //   .get(`/owners/${testOwnerID1}`)
    //   .end(function(err, res) {
    //     let data = JSON.parse(res)
    //     expect(err).to.be.null
    //     expect(data.pets).to.not.include(testDogID1)
    //     done()
    //   })
    // })

    // it('should properly delete an owner object and return a 204 status for a DELETE request to \'/owners/:id\'', function(done) {
    //   chai.request(app)
    //   .del(`/owners/${testOwnerID2}`)
    //   .end(function(err, res) {
    //     expect(err).to.be.null
    //     expect(res).to.have.status(204)
    //     done()
    //   })
    // })
    //
    // it('should properly cascade delete the entire pet related to the deleted owner', function(done) {
    //   chai.request(app)
    //   .get(`/dogs/${testDogID2}`)
    //   .end(function(err, res) {
    //     expect(err).to.be.null
    //     expect(res).to.have.status(200)
    //     expect(res.text).to.equal('null')
    //     done()
    //   })
    // })

    it('should fail and return a 404 status for a DELETE request to \'/dogs/:id\' for a nonexistent object', function(done) {
      let newId = new ObjectId()
      chai.request(app)
      .del(`/dogs/${newId}`)
      .end(function(err, res) {
        expect(res).to.have.status(404)
        done()
      })
    })
    //
    // it('clean-up!', function(done) {
    //   chai.request(app)
    //   .del(`/owners/${testOwnerID1}`)
    //   .end(function(err, res) {
    //     expect(err).to.be.null
    //     expect(res).to.have.status(204)
    //     done()
    //   })
    // })

  })

  after(function(done){
    server.close(function(){
      console.log('server shut down.')
      done()
    })
  })

})
