'use strict';

const Event = require('../model/event');

module.exports = function() {
  return new Event({ username:'Trent', description:'Recieved a drop!' }).save();
};
