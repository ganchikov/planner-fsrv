// Initializes the `tasks` service on path `/tasks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');
const routeBuilder = require('../../helpers/routebuilder');
const {idgenerator, tasks} = require('../../constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tasks',
    Model,
    paginate
  };

  const route = routeBuilder(app, tasks);

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
