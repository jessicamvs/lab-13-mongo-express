'use strict'

let response = {}

response.sendJSON = function(response, status, data) {
  response.status(status).json(data)
}

response.sendText = function(response, status, text) {
  let message = text ? text : 'empty response'
  response.status(status).send(message)
}

module.exports = response
