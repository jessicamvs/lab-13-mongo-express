'use strict'

// const fetch = require('fetch')
const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')
const ObjectId = require('mongoose').Types.ObjectId

chai.use(chaiHttp)

const app = require('../index.js')

describe('Dog API', function() {
  let testID1 = ''
  let testID2 = ''

  it('should get a 200 response with a correct object for a GET request to \'/\'', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.text).to.be.equal('Hello, world! This is the amazing dogs api\n')
        done()
      })
  })

  it('should get a 422 response for a GET request to \'/dogs/improperid\'', function(done) {
    chai.request(app)
      .get('/dogs/improperid')
      .end(function(err, res) {
        expect(res).to.have.status(422)
        expect(res.text).to.be.equal('invalid object')
        done()
      })
  })

  it('should get a 200 response with null for a GET request to \'/dogs/:id\' with a nonexistent id', function(done) {
    let newId = new ObjectId()
    chai.request(app)
      .get(`/dogs/${newId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.text).to.be.equal('null')
        done()
      })
  })

  it('should get a 201 response with a correct object for a POST request to \'/dogs\'', function(done) {
    let testName = 'POSTtest'
    let testBreed = 'POSTtest'
    chai.request(app)
      .post('/dogs')
      .send({ name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testID1 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })

  it('should properly update and return an object for a PUT request to \'/dogs\'', function(done) {
    let testName = 'PUTtest1Name'
    let testBreed = 'PUTtest1Breed'
    chai.request(app)
      .put('/dogs')
      .send({ id: testID1, name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })

  it('should properly create a new object if an ID does not exist for a PUT request to \'/dogs\'', function(done) {
    let testName = 'PUTtest2Name'
    let testBreed = 'PUTtest2Breed'
    let newId = new ObjectId()
    chai.request(app)
      .put('/dogs')
      .send({ id: newId, name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testID2 = data['_id']
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })

  it('should properly delete an object and return a 204 status for a DELETE request to \'/dogs/:id\'', function(done) {
    chai.request(app)
      .del(`/dogs/${testID1}`)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
  })

  it('should fail silently and return a 204 status for a DELETE request to \'/dogs/:id\' for a nonexistent object', function(done) {
    let newId = new ObjectId()
    chai.request(app)
      .del(`/dogs/${newId}`)
      .end(function(err, res) {
        expect(res).to.have.status(204)
        done()
      })
  })

  it('clean-up! deleting other object created in test', function(done) {
    chai.request(app)
      .del(`/dogs/${testID2}`)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
  })

})
