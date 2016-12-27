'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const bookRouter = require('./routes/book-routes.js');
app.use(jsonParser);
app.use('/api', bookRouter);

// module.exports = app;

// if (require.main === module) {
app.listen(PORT, () => console.log(`server started on ${PORT}`));
// }
