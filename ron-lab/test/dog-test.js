'use strict'

describe('this is the server', function() {
  let server = undefined
  before(function() {
    server = require('../index.js')
    server.listen(3000)
  })

  after(function() {
    server.close()
  })
})
