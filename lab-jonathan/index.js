let express = require('express');
let mongoose = require('mongoose');
let jsonParser = require('body-parser').jsonParser;
let PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);


let app = express();

let guitarRouter = require('./route/guitars-routes');
app.use(guitarRouter);





module.exports = app;

if(require.main === module) {
  app.listen(PORT, () => console.log(`server is up on ${PORT}`));
}
