// Initializes the `workspace` service on path `/workspace`
const createService = require('feathers-mongoose');
const createModel = require('@models/workspace.model');
const hooks = require('./workspace.hooks');
const routeBuilder = require('@helpers/routebuilder');

const {idgenerator, workspace} = require('@constants/services');


module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'workspace',
    Model,
    paginate
  };

  const route = routeBuilder(app, workspace);
  
  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.generateId = async(item) => {
    const idGenerator = app.service(routeBuilder(app, idgenerator));   
    item.id = await idGenerator.generateId();
  };

  service.hooks(hooks);
};
