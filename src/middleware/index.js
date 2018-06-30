const restHeaders = require('./rest-headers');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  app.use(restHeaders);
};
