let express = require('express');
let mongoose = require('mongoose');
let jsonParser = require('body-parser').jsonParser;

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT || 3000;
console.log(MONGODB_URI);

let app = express();

let leagueRouter = require('./routes/fantasy-routes');

app.use(leagueRouter);

mongoose.Promise = Promise; //uses promises with mongoose.

mongoose.connect(MONGODB_URI);

if(require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
