'use strict'

const Owner = require('../model/owner')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo

  router.get('/owners', function(request, response, next) {
    Owner.find()
      .populate('pets')
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.get('/owners/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).json({error: 'invalid object'})
    }
    Owner.findById(request.params.id)
      .populate('pets')
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.post('/owners', function(request, response, next) {
    new Owner(request.body).save()
    .then(data => {
      response.status(201).json(data)
    })
    .catch(next)
  })

  router.put('/owners', function(request, response, next) {
    if (!ObjectId.isValid(request.body.id)) {
      return response.status(404).json({error: 'invalid object'})
    }
    Owner.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        response.status(200).json(data)
      })
      .catch(next)
  })

  router.delete('/owners/:id', function(request, response, next) {
    if (!ObjectId.isValid(request.params.id)) {
      return response.status(422).json({error: 'invalid object'})
    }
    Owner.findById(request.params.id)
      .then(doc => {
        doc
          .remove()
          .then(() => response.status(204).json())
          .catch(next)
      })
      .catch(next)
  })
}
