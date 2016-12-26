'use strict'

const responseHandler = require('../lib/responseHandler')

module.exports = (router, storage) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('/', function(request, response) {
    responseHandler.sendText(response, 200, 'Hello, world! This is the amazing dogs api\n')
  })

  router.get('/dogs/all', function(request, response) {
    storage.fetchAll()
      .then(data => {
        responseHandler.sendJSON(response, data.code, data.data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.get('/dogs/:id', function(request, response) {
    storage.fetchItem(request.params.id)
      .then(data => {
        responseHandler.sendJSON(response, data.code, data.data)
      })
      .catch(err => {
        responseHandler.sendText(response, 404, err)
      })
  })

  router.post('/dogs', function(request, response) {
    storage.postItem(request.body)
      .then(data => {
        responseHandler.sendJSON(response, data.code, data.data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.put('/dogs', function(request, response) {
    storage.putItem(request.body)
      .then(data => {
        responseHandler.sendJSON(response, data.code, data.data)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })

  router.delete('/dogs/:id', function(request, response) {
    storage.deleteItem(request.params.id)
      .then(data => {
        responseHandler.sendText(response, data.code, data.text)
      })
      .catch(err => {
        responseHandler.sendText(response, 400, err)
      })
  })
}
