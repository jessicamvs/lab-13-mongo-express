'use strict'

const Owner = require('../model/owner')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo

  router.get('/owners/all', function(request, response, next) {
    Owner.find()
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.get('/owners/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object')
    }
    Owner.findById(request.params.id)
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.get('/owners/:id/dogs', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object')
    }
    Owner.findById(request.params.id)
      .populate('pets')
      .exec((err, owner) => {
        if (err) next(err)
        response.json(owner)
      })
  })

  router.post('/owners', function(request, response, next) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(422).send('invalid object')
    }

    new Owner(request.body).save()
    .then(data => {
      response.status(201).json(data)
    })
    .catch(next)
  })

  router.put('/owners', function(request, response, next) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(404).send('invalid object')
    }
    Owner.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.delete('/owners/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).send('invalid object')
    }
    Owner.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).send()
      })
      .catch(next)
  })
}
