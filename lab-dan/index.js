'use strict'

let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/dogApi'
let PORT = process.env.PORT || 3000


const Express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = Express()
const router = Express.Router()
const htmlErrorHandler = require('./lib/htmlErrorHandler')
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect(MONGO_URI)

require('./routes/dog-routes')(router)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(router)

app.use(htmlErrorHandler)

// init server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// for testing purposes
module.exports = app
