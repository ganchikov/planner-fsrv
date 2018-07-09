// Initializes the `jwks` service on path `/jwks`
const createService = require('./jwks.class.js');
const hooks = require('./jwks.hooks');

const routeBuilder = require('../../helpers/routebuilder');
const {jwks} = require('../../constants/services');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'jwks',
    paginate
  };

  const route = routeBuilder(app, jwks);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.hooks(hooks);
};
