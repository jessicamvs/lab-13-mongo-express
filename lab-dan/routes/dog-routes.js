'use strict'

const Dog = require('../model/dog')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('/', function(request, response) {
    response.status(200).send('Hello, world! This is the amazing dogs api\n').end('\n')
  })

  router.get('/dogs/all', function(request, response, next) {
    Dog.find()
      .then(data => {
        response.status(200).json(data).end('\n')
      })
      .catch(next)
  })

  router.get('/dogs/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object').end('\n')
    }
    Dog.findById(request.params.id)
      .then(data => {
        response.status(200).json(data).end('\n')
      })
      .catch(next)
  })

  router.post('/dogs', function(request, response, next) {
    // in order to add a dog, must add or connect to existing owner
    if (!ObjectId.isValid(request.body.owner)) {
      return response.status(422).send('invalid object').end('\n')
    }

    new Dog(request.body).save('\n')
    .then(data => {
      response.status(201).json(data).end('\n')
    })
    .catch(next)
  })

  router.put('/dogs', function(request, response, next) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(404).send('invalid object').end('\n')
    }
    Dog.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        response.status(200).json(data).end('\n')
      })
      .catch(next)
  })

  router.delete('/dogs/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object').end('\n')
    }
    Dog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).send().end('\n')
      })
      .catch(next)
  })
}
