'use strict';

let express = require('express');
let jsonParser = require('body-parser').json;

let app = express();
let router = express.Router();

app.use(jsonParser);
require('./route/albumRoutes.js')(router);
app.use(router);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});