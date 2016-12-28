
//npm modules
let express = require('express');
let cors = require('cors');
let morgan = require('morgan');
let mongoose = require('mongoose');
let Promise = require('bluebird');
let jsonParser = require('body-parser').jsonParser;

//app modules
let ownerRouter = require('./route/owners-routes.js');
let guitarRouter = require('./route/guitars-routes');

//module connection stuff
let PORT = process.env.PORT || 9000;
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/guitars';

//connect to db
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

//app middleware
let app = express();
app.use(cors());
app.use(morgan('dev'));


//routes
app.use(ownerRouter);
app.use(guitarRouter);
console.log(MONGO_URI);
mongoose.connect(MONGO_URI).then(() => {
  let server = module.exports = app.listen(PORT, function(){
    console.log(`server is up on ${PORT}`);
  });

  server.isRunning = true;
});


// module.exports = app;

// if(require.main === module) {
//   app.listen(PORT, () => console.log(`server is up on ${PORT}`));
// }
