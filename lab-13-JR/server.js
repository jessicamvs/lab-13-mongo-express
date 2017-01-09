'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const recipeRouter = require('./route/recipe-route');
const errorMiddleware = require('./lib/error-middleware');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dev';
const debug = require('debug')('recipe:server');


//ask about module caching!!!
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());

app.use(recipeRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, function(){
  debug(`server @ ${PORT}`);
});

server.isRunning = true;

//this is how module caching works:
// let evaluated = false
// let cache = 0
// function calc(x, y) {
//   if (evaluated) return cache
//   cache = x + y
//   evaluated = true
//   return cache
// }
