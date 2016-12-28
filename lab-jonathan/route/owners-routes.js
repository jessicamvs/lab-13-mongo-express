let Router = require('express').Router;
let jsonParser = require('body-parser').json();

let Guitar = require('../model/guitars.js');

let guitarRouter = module.exports = new Router();

guitarRouter.post('/api/guitars/:listID/guitar', jsonParser, function(req, res, next){
  Guitar.findByIdAndAddGuitar(req.params.listID, req.body)
  .then( guitar => res.json(guitar))
  .catch(next);
});
