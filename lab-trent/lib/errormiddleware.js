'use strict';

module.exports = function(err, req, res, next) {
  if (err) {
    console.log(err);
    if (err.status) res.status(err.status);
    res.end(err.message);
  } else {
    console.log('Unhandled error.');
    res.end('Whoops. Unhandled error!');
  }
  next();
};
