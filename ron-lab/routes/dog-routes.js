'use strict'

let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Dog = require('../models/dog.js')
let router = module.exports = new Router()

router.post('/dogs', jsonParser, (req, res, next) => {
  new Dog(req.body).save()
  .then(dog => res.json(dog))
  .catch(next)
})

router.get('/dogs/:id', (req, res, next) => {
  Dog.findById(req.params.id)
  .then(dog => res.json(dog))
  .catch(next)
})
