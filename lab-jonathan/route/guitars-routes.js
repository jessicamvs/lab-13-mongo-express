let Guitar = require('../model/guitars.js');
let Router = require('express').Router;
let router = module.exports = new Router();
let jsonParser = require('body-parser').json();


router.get('/guitars/:id', (req, res, next) => {
  Guitar.findById(req.params.id)
    .then(guitar => res.json(guitar))
    .catch(next);
});


router.post('/guitars', jsonParser, function(req, res, next) {
  new Guitar(req.body).save()
  .then(guitar => res.json(guitar))
  .catch(next);
});


router.put('/guitars/:id', function(req, res, next){
  Guitar.findById(req.params.id)
  .then(function(axe){
    Guitar.update({make: axe.make}, function(err){
      if(err){
        console.error(err);
      }
      console.log('updated the axe');
      res.status(200).end('guitar updated');
    });
  })
  .catch(next);
});


router.delete('/guitars/:id', function(req, res, next){
  Guitar.findById(req.params.id)
  .then(function(axe){
    Guitar.remove({make: axe.make}, function(err){
      if(err){
        console.error(err);
      }
      console.log('deleted the axe');
      res.status(204).end();
    })
    .catch(err => {
      console.error('did not delete');
      res.status(404);
      res.json({msg: 'Not Found'});
    });
  });
});
