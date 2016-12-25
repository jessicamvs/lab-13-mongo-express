let Router = require('express').Router;
let jsonParser = require('body-parser').json();

let League = require('../model/fantasy');
let router = module.exports = new Router();

router.post('/leagues', jsonParser, (req, res, next) => {
  if (Object.keys(req.body).length === 0 || !req.body.leagueName) {
    res.status(400).end('bad request');
    return;
  }
  res.status(200).write('creating new league...');
  new League(req.body).save()
  .then(league => res.json(league))
  .catch(next);
});
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
      if (Object.keys(req.body).length === 0 || !req.body.leagueName) {
        res.status(400).end('bad request');
        return;
      } else {
        res.status(404).end('not found');
        return;
      }
    }
  })
  .then(function(league) {
    league.update({leagueName: req.body.leagueName}, function(err) {
      if (err) {
        console.error(err);
      }
      res.status(200).end('League successfully updated');
    });
  })
  .catch(next);
});
// });

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
