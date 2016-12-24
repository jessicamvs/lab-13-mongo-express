let expect = require('chai').expect;

describe('our server', function() {
  let server = undefined;
  before(function() {
    server = require('../index.js');
    server.lisen(3000);
  });
  //TODO: DO ALL MY TESTS GO HERE

  after(function() {
    server.close();
  });
});
