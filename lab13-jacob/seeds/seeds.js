'use strict';

let League = require('../model/fantasy');
let Player = require('../model/players');

new League({
  leagueName: 'Winning League',
  creator: 1
}).save().then(function(league) {
  new Player({
    _id: 1,
    name: 'Jacob Isenberg',
    leagues: [league._id]
  }).save();
});

new League({
  leagueName: 'Losing League',
  creator: 2
}).save().then(function(league) {
  new Player ({
    _id: 2,
    name: 'Scott Schmidt',
    leagues: [league._id]
  }).save();
});

//the seeding is only one to one but the set-up supports one-to-many
