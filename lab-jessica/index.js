'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const morgan = require('morgan');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dev';
console.log(MONGODB_URI);

const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const bookRouter = require('./routes/book-routes.js');
const authorRouter = require('./routes/author-routes.js');

app.use(morgan('dev'));
app.use(jsonParser);
app.use('/api', authorRouter);
app.use('/api', bookRouter);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
}
