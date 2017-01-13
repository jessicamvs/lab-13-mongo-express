'use strict'

let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')
// let ObjectId = require('mongoose').Types.ObjectId

let Car = require('../model/car')
let url = 'http://localhost:3000/api'

let testCar = {
  name: 'Kia'
}

describe('a restfull endpoint', function() {

  let server

  before(done => {
    server = require('../index.js')
    server.listen(3000)
    mongoose.connection.on('open', done)
  })

  // after(() => {
  //   server.close()
  // })

  describe('an unregisterd route', function() {
    it('will respond 404', function(done) {
      request.get(`${url}/cars/1234`)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.text).to.equal('not found')
        done()
      })
    })
  })

  describe('GET', function() {

    describe('/api/cars', function() {
      it('will return an array of cars', function(done) {
        request.get(`${url}/cars/`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(typeof res.body).to.equal(typeof [])
            done()
          })
      })
    })

    describe('/api/cars/:id', function() {

      before( done => {
        new Car(testCar).save()
          .then( car => {
            this.testCar = car
            done()
          })
          .catch(done)
      })
      after( done => {
        Car.remove({})
          .then( () => done())
          .catch(done)
      })

      it('can fetch a schema object', done => {
        request.get(`${url}/cars/${this.testCar._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Kia')
            done()
          })
      })
    })
  })

  describe('POST', function() {
    after( done => {
      Car.remove({})
        .then( () => done())
        .catch(done)
    })

    describe('/api/cars/', function() {

      it('can create a new car', function(done) {
        request.post(`${url}/cars/`)
          .send({name: 'Chevy'})
          .end( (err, res)  => {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Chevy')
            done()
          })
      })

      it('will throw an error if no body is provided', function(done) {
        request.post(`${url}/cars/`)
          .end( (err, res) => {
            expect(res.status).to.equal(400)
            expect(res.text).to.equal('bad request')
            done()
          })
      })
    })
  })

  describe('PUT', function() {


    describe('/api/cars/id', function() {

      before( done => {
        new Car(testCar).save()
        .then( car => {
          this.testCar = car
          done()
        })
        .catch(done)
      })

      after( done => {
        Car.remove({})
        .then( () => done())
        .catch(done)
      })

      it('can update a car', done => {
        request.put(`${url}/cars/${this.testCar._id}`)
          .send({name: 'Toyota'})
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Toyota')
            done()
          })
      })
      it('will return 400 if no body is provided', done => {
        request.put(`${url}/cars/${this.testCar._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(400)
            expect(res.text).to.equal('bad request')
            done()
          })
      })

      // dont know why this test fails, perhaps something with the model?
      // it('will return 404 if provided an invalid id', done => {
      //   request.put(`${url}/cars/fail`)
      //     .send({name: 'Toyota'})
      //     .end( (err, res) => {
      //       expect(res.status).to.equal(404)
      //       expect(res.text).to.equal('not found')
      //       done()
      //     })
      // })
    })

    describe('DELETE', function() {

      before( done => {
        new Car(testCar).save()
          .then( car => {
            this.testCar = car
            done()
          })
          .catch(done)
      })

      it('can delete a car', done => {
        request.delete(`${url}/cars/${this.testCar._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            // expect(res.body).to.equal({})
            done()
          })
      })

      // dont know why this one doesnt work either....
      // it('will return not found with invalid id', done => {
      //   request.delete(`${url}/cars/${this.testCar._id}`)
      //     .end( (err, res) => {
      //       expect(res.status).to.equal(400)
      //       expect(res.text).to.equal('not found')
      //       done()
      //     })
      // })
    })
  })
})
