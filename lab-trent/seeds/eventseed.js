'use strict';

const Event = require('../model/event');
const Value = require('../model/value');

module.exports.seedDatabase = function(callback) {
  new Event({ username:'Trent', description:'Recieved a drop!' }).save()
  .then(function(event) {
    new Value({ value: 50000, event: event._id}).save().then(callback);
  });
};
