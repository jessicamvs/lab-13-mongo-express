
//npm modules
let express = require('express');
let mongoose = require('mongoose');
let Promise = require('bluebird');

//app modules
let ownerRouter = require('./route/owners-routes');
let guitarRouter = require('./route/guitars-routes');

//module connection stuff
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/guitarsOwnersDB';  //export MONGO_URI='mongodb://localhost/guitarsOwnersDB'
let PORT = process.env.PORT || 9000;

//connect to db
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

//app middleware
let app = express();



//routes
mongoose.createConnection(MONGO_URI);
app.use(ownerRouter);
app.use(guitarRouter);

if (require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}


module.exports = app;
