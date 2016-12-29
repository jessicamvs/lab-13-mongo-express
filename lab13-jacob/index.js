'use strict';

let express = require('express');
let mongoose = require('mongoose');
let jsonParser = require('body-parser').json();


let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/fantasy';
let PORT = process.env.PORT || 3000;
console.log(MONGODB_URI);

let app = express();

let leagueRouter = require('./routes/fantasy-routes');

app.use(leagueRouter);
app.use(jsonParser);

app.get('/', (req, res) => res.json({msg: 'hello'}));

mongoose.Promise = Promise; //uses promises with mongoose.

mongoose.connect(MONGODB_URI);

module.exports = app;

if(require.main === module) {
  console.log('here');
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
