let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fantasySchema = Schema ({
  leagueName: {type: String, required: true},
  // numPlayers: {type: Number, require: true},
  // dateOfCreation: {type: Date, default: Date.now},
  // commissioner: {type: Boolean},
});

module.exports = mongoose.model('league', fantasySchema);
