'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorMiddleware = require('./lib/errormiddleware');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev';
const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function() {
  console.log('Connected to MongoDB successfully.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('*', function(req, res, next) {
  console.log(req.method + ' connection from: ' + req.connection.remoteAddress.replace('::ffff:', '') + ' requesting ' + req.params[0]);
  next();
});

app.use('/api', require('./routes/event-route'));
app.use('/api', require('./routes/value-route'));
app.use(errorMiddleware);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, function() {
    console.log('Server listening on http://localhost/:' + PORT);
  });
}
