// Initializes the `people` service on path `/people`
const createService = require('feathers-mongoose');
const routeBuilder = require('../../helpers/routebuilder');
const createModel = require('../../models/people.model');
const hooks = require('./people.hooks');
const {idgenerator, people} = require('../../constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'people',
    Model,
    paginate
  };
  const route = routeBuilder(app, people);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.getChildren = async (items) => {    
    if (!items || !(items instanceof Array) ) return;
    for (const item of items) {
      await Model.populate(item, {path: 'absences'}); 
    }
  };

  service.generateId = async(item) => {
    const idGenerator = app.service(routeBuilder(app, idgenerator));   
    item.id = await idGenerator.generateId();
  };

  service.hooks(hooks);
};
