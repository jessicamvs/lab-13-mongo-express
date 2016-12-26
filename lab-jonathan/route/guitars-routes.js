let Guitar = require('../model/guitars.js');
let Router = require('express').Router;
let router = module.exports = new Router();
let jsonParser = require('body-parser').json();


  router.get('/guitars/:id', (req, res, next) => {
    Guitar.findById(req.params.id)
    .then(guitar => res.json(guitar))
    .catch(next)
  });


  router.post('/guitars', jsonParser, function(req, res, next) {
    new Guitar(req.body).save()
      .then(guitar => res.json(guitar))
      .catch(next)
  });

  router.put('/guitars/:id', function(req, res, next) {
    Guitar.findById(req.params.id)
      Guitar.updateItem(req.params.id, req.body.make, req.body.model)
      .then(guitar => res.json(guitar))
      .catch(next)
  });


  router.delete('/guitars/:id', function(req, res, next){
      Guitar.deleteItem(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(404);
        res.json({msg: 'Not Found'});
      });
      return;
    });
