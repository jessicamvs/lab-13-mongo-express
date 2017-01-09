'use strict';

const express = require('express');
const mongoose = require('mongoose');
// const jsonParser = require('body-parser').jsonParser;
const morgan = require('morgan');

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/api/recipeDB';
let PORT = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(morgan('dev'));

let recipeRouter = require('./route/recipe-routes');
app.use(recipeRouter);

if (require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
module.exports = app;
