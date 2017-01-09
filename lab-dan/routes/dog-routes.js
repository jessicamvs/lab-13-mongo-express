'use strict'

const responseHandler = require('../lib/responseHandler')
const Dog = require('../model/dog')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = (router) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('/', function(request, response) {
    responseHandler.sendText(response, 200, 'Hello, world! This is the amazing dogs api\n')
  })

  router.get('/dogs/all', function(request, response) {
    Dog.find()
      .then(data => {
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.get('/dogs/:id', function(request, response) {
    if (!ObjectId.isValid(request.params.id)) {
      return responseHandler.sendText(response, 422, 'invalid object')
    }
    Dog.findById(request.params.id)
      .then(data => {
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(() => {
        responseHandler.sendText(response, 404, 'not found')
      })
  })

  router.post('/dogs', function(request, response) {
    new Dog(request.body).save()
      .then(data => {
        responseHandler.sendJSON(response, 201, data)
      })
      .catch(() => {
        responseHandler.sendText(response, 400, 'bad request')
      })
  })

  router.put('/dogs', function(request, response) {
    if (!ObjectId.isValid(request.body.id)) {
      return responseHandler.sendText(response, 404, 'invalid object')
    }
    Dog.findByIdAndUpdate(request.body.id, request.body, {upsert: true, new: true})
      .then(data => {
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(() => {
        responseHandler.sendText(response, 404, 'not found')
      })
  })

  router.delete('/dogs/:id', function(request, response) {
    if (!ObjectId.isValid(request.params.id)) {
      return responseHandler.sendText(response, 422, 'invalid object')
    }
    Dog.findByIdAndRemove(request.params.id)
      .then(() => {
        responseHandler.sendText(response, 204)
      })
      .catch(err => {
        responseHandler.sendText(response, 404, err)
      })
  })
}
