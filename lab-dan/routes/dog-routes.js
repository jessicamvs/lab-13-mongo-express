'use strict'

const Dog = require('../model/dog')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('/', function(request, response) {
    response.status(200).send('Hello, world! This is the amazing dogs api\n')
  })

  router.get('/dogs/all', function(request, response) {
    Dog.find()
      .then(data => {
        response.status(200).json(data)
      })
      .catch(err => {
        response.status(400).send(err)
      })
  })

  router.get('/dogs/:id', function(request, response) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object')
    }
    Dog.findById(request.params.id)
      .then(data => {
        response.status(200).json(data)
      })
      .catch(() => {
        response.status(404).send('not found')
      })
  })

  router.post('/dogs', function(request, response) {
    new Dog(request.body).save()
      .then(data => {
        response.status(201).json(data)
      })
      .catch(() => {
        response.status(400).send('bad request')
      })
  })

  router.put('/dogs', function(request, response) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(404).send('invalid object')
    }
    Dog.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        response.status(200).json(data)
      })
      .catch(() => {
        response.status(404).send('not found')
      })
  })

  router.delete('/dogs/:id', function(request, response) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object')
    }
    Dog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).send()
      })
      .catch(err => {
        response.status(404).send(err)
      })
  })
}
