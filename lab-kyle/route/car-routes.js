'use strict'

let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Car = require('../model/car')
let router = module.exports = new Router()

router.post('/api/cars', jsonParser, (req, res) => {
  new Car(req.body).save()
    .then(car => res.json(car))
    .catch(() => {
      res.status(400).send('bad request')
    })
})

router.get('/api/cars', (req, res, next) => {
  Car.find({})
    .then(schema => res.json(schema))
    .catch(next)
})

router.get('/api/cars/:id', (req, res) => {
  Car.findById(req.params.id)
    .then(car => res.json(car))
    .catch(() => {
      res.status(404).send('not found')
    })
})

router.put('/api/cars/:id', jsonParser, (req, res) => {
  if (req.body.name) {
    Car.findOneAndUpdate(req.params.id, req.body, {new: true})
        .then(car => res.json(car))
        .catch(() => {
          res.status(404).send('not found')
        })
  } else {
    res.status(400).send('bad request')
  }
})

router.delete('/api/cars/:id', (req, res) => {
  Car.findOneAndRemove(req.params.id)
    .then(car => res.json(car))
    .catch(() => {
      res.status(404).send('not found')
    })
})
