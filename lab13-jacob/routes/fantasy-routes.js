'use strict';

let Router = require('express').Router;
let jsonParser = require('body-parser').json();

let Player = require('../model/players');
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


router.post('/players', jsonParser, (req, res, next) => {
  if (Object.keys(req.body).length === 0 || !req.body._id) { //don't forget underscore
    res.status(400).end('bad request');
    return;
  }
  new Player(req.body).save() //creates player with req.body
  .then(player => {
    res.json(player);//responds to confirm
  })
  .catch(next);
});

router.get('/leagues/:id', (req, res, next) => {
  League.findById(req.params.id, function(err) {
    if(err) {
      res.status(404).end('ID not found');
    }
  })//database read
  .then(league => res.status(200).json(league))
  .catch(next);
});

router.get('/players/:id/leagues', (req, res, next) => {
  Player.findById(req.params.id, function(err) {
    if (err) {
      res.status(404).end('ID not found');
    }
  })
  .populate({
    path: 'leagues', select: 'leagueName'})
  .then(function(leagues, err) {
    if (err) {
      console.error(err);
      res.end();
    }
    res.end(`${leagues.name} belongs to ${leagues.leagues.length} leagues: \n ${leagues.leagues}`);
  })
  .catch(next);
});


router.put('/leagues/:id', jsonParser, (req, res) => {
  League.findById(req.params.id)
  .then(function(league) {
    console.log('HERE I AM');
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
  .catch(function(err) {
    if(err) {
      res.status(404).end('not found');
    }
  });
});

router.put('/players/:id', jsonParser, (req, res) => {
  Player.findById(req.params.id)
  .then(function(player) {
    if(req.body.name) {
      player.update({name: req.body.name}, function(err) {
        if(err) {
          res.status(400).end('bad request');
        } else {
          res.status(200).json(player);
        }
      });
    } else if (req.body.leagues) {
      player.update({leagues: req.body.leagues}, function(err) {
        if(err) {
          res.status(400).end('bad request');
        } else {
          res.status(200).json(player);
        }
      });
    } else {
      res.status(400).end('bad request');
    }
  })
  .catch(function(err) {
    if(err) {
      res.status(404).end('not found');
    }
  });
});

router.delete('/players/:id', (req, res, next) => {
  Player.findById(req.params.id, err => {
    if(err) {
      res.status(404).end('not found');
      return;
    }
  })
  .then(function(player) {
    player.remove({_id: player._id}, function(err) {
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
