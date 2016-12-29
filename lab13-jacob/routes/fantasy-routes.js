'use strict';

let Router = require('express').Router;
let jsonParser = require('body-parser').json();

// let Player = require('../model/players')
let League = require('../model/fantasy');
let router = module.exports = new Router();

router.post('/leagues', jsonParser, (req, res, next) => {
  if (Object.keys(req.body).length === 0 || !req.body.leagueName) {
    res.status(400).end('bad request');
    return;
  }
  new League(req.body).save()
  .then(function(league) {
    res.json(league);
  })
  .catch(next);
});

// router.post('/players', jsonParser, (req, res next) => {
//   if (Object.keys(req.body).length)
// })
//when the router encounters a post request, parse the body, take the request, response and next operations. Make a new League with the body, then save it.

router.get('/leagues/:id', (req, res, next) => {
  League.findById(req.params.id, function(err) {
    if(err) {
      res.status(404).end('ID not found');
    }
  })//database read
  .then(league => res.status(200).json(league))
  .catch(next);
});

router.put('/leagues/:id', jsonParser, (req, res, next) => {
  League.findById(req.params.id, function(err) {
      //     // {numPlayers: req.body.numPlayers},
      //     // {dateOfCreation: req.body.dateOfCreation},
      //     // {commissioner: req.body.commissioner}]); //am I feeling ambituous?? not yet...
    if (err) {
      res.status(404).end('not found');
    }
  })
  .then(function(league) {
    console.log(req.body);
    if(!req.body.leagueName) {
      res.status(400).end('bad request');
    } else {
      league.update({leagueName: req.body.leagueName}, function(err) {
        if (err) {
          res.status(400).end('bad request');
        } else {
          res.status(200).json(league);
        }
      });
    }
  })
  .catch(next);
});


router.delete('/leagues/:id', (req, res, next) => {
  League.findById(req.params.id, err => {
    if(err) {
      res.status(404).end('not found');
      return;
    }
  })
  .then(function(league) {
    league.remove({leagueName: league.leagueName}, function(err) {
      if(err) {
        console.error(err);
        res.status(404).end('not found');
        return;
      }
      res.status(204).end();
    });
  })
  .catch(next);
});
