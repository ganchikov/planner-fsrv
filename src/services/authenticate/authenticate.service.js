// Initializes the `authorize` service on path `/authorize`
const createService = require('feathers-mongoose');
const createModel = require('../../models/authenticate.model');
const hooks = require('./authenticate.hooks');
const routeBuilder = require('../../helpers/routebuilder');
const {authenticate} = require('../../constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'authenticate',
    Model,
    paginate
  };

  const route = routeBuilder(app, authenticate);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.hooks(hooks);
};
