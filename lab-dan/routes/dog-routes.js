'use strict'

const responseHandler = require('../lib/responseHandler')
const Dog = require('../model/dog')

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
    Dog.findById(request.params.id)
      .then(data => {
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(err => {
        responseHandler.sendText(response, 404, err)
      })
  })

  router.post('/dogs', function(request, response) {
    new Dog(request.body).save()
      .then(data => {
        responseHandler.sendJSON(response, 201, data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.put('/dogs', function(request, response) {
    Dog.findByIdAndUpdate(request.body.id, request.body, {new: true, upsert: true})
      .then(data => {
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.delete('/dogs/:id', function(request, response) {
    Dog.findByIdAndRemove(request.params.id)
      .then(data => {
        data.message = 'Delete Successful'
        responseHandler.sendJSON(response, 200, data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })
}
