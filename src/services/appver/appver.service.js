// Initializes the `appver` service on path `/appver`
const createService = require('./appver.class.js');
const hooks = require('./appver.hooks');
const routeBuilder = require('../../helpers/routebuilder');
const {appver} = require('../../constants/services');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const route = routeBuilder(app,appver);

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service(route);

  service.hooks(hooks);
};
