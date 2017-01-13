'use strict';

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const middleware = require('./lib/middleware.js');
const songRouter = require('./route/song-route.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URU;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(morgan('dev'));

app.use(songRouter);
app.use(middleware);

module.exports = app;

const server = module.exports = app.listen(PORT, function(){
  console.log(`server up on port ${PORT}`);
});
