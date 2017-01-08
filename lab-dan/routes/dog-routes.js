'use strict'

const Dog = require('../model/dog')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('/', function(request, response) {
    response.status(200).json('Hello, world! This is the amazing dogs api\n')
  })

  router.get('/dogs', function(request, response, next) {
    Dog.find()
      .populate('owner')
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.get('/dogs/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).json({error: 'invalid object'})
    }
    Dog.findById(request.params.id)
      .populate('owner')
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.post('/dogs', function(request, response, next) {
    // in order to add a dog, must add or connect to existing owner
    if (!ObjectId.isValid(request.body.owner)) {
      return response.status(422).json({error: 'invalid object'})
    }

    new Dog(request.body).save()
    .then(data => {
      response.status(201).json(data)
    })
    .catch(next)
  })

  router.put('/dogs', function(request, response, next) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(404).json({error: 'invalid object'})
    }
    Dog.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.delete('/dogs/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).json({error: 'invalid object'})
    }
    Dog.findById(request.params.id)
      .then(doc => {
        doc
          .remove()
          .then(() => response.status(204).json())
          .catch(next)
      })
      .catch(next)
  })
}
