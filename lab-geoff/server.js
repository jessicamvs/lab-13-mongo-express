'use strict';

let express = require('express');
let mongoose = require('mongoose');

// let MONGO_URI = process.env.MONGO_URI;
let MONGO_URI = 'mongodb://localhost/albums';
console.log(MONGO_URI);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

let app = express();

let albumRouter = require('./route/albumRoutes.js');
app.use(albumRouter);

module.exports = app;

// app.listen(PORT, () => {
//   console.log(`Server on ${PORT}`);
// });