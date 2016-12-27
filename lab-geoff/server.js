'use strict';

let express = require('express');
let mongoose = require('mongoose');
// let jsonParser = require('body-parser').jsonParser; //not sure

// let MONGO_URI = process.env.MONGO_URI;
let MONGO_URI = 'mongodb://localhost/albums';
console.log(MONGO_URI);
let PORT = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

let app = express();

let albumRouter = require('./route/albumRoutes.js');
app.use(albumRouter);
// app.use('/albums', albumRouter);

module.exports = app;
//
// app.listen(PORT, () => {
//   console.log(`Server on ${PORT}`);
// });