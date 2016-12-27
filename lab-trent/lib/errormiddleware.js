'use strict';

module.exports = function(err, req, res, next) {
  if (err) {
    if (err.status) res.status(err.status);
    res.end(err.message);
  } else {
    res.end('Whoops. Unhandled error!');
  }
};
