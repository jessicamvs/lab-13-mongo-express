let Router = require('express').Router;
let jsonParser = require('body-parser').json();

let League = require('../model/fantasy');
let router = module.exports = new Router();

router.post('/leagues', jsonParser, (req, res, next) => {
  new League(req.body).save()
  .then(league => res.json(league))
  .catch(next);
});
//when the router encounters a post request, parse the body, take the request, response and next operations. Make a new League with the body, then save it.

router.get('/leagues/:id', (req, res, next) => {
  League.findById(req.params.id)//database read
  .then(league => res.json(league))
  .catch(next);
});

router.put('/leagues/:id', jsonParser, (req, res, next) => {
  League.findByIdAndUpdate(req.params.id,
    {leagueName: req.body.leagueName}, err => {
      //     // {numPlayers: req.body.numPlayers},
      //     // {dateOfCreation: req.body.dateOfCreation},
      //     // {commissioner: req.body.commissioner}]);
      if(err) {
        console.error(err);
      }
    });
  res.end('League successfully updated');
  next();
});

router.delete('/leagues/:id', (req, res) => {
  League.findByIdAndRemove(req.params.id, err => {
    if(err) {
      console.error(err);
    }
  });
  res.end('fantasy league succesfully deleted');
});



//mongodb://localhost/usr/local/var/mongodb
