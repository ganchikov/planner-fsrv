// Initializes the `absences` service on path `/absences`
const createService = require('feathers-mongoose');
const routeBuilder = require('../routebuilder');
const createModel = require('../../models/absences.model');
const hooks = require('./absences.hooks');
const {idgenerator, absences} = require('../../constants/services');


module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: absences,
    Model,
    paginate
  };

  const route = routeBuilder(absences);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.generateId = async(item) => {
    const idGenerator = app.service(idgenerator);   
    item.id = await idGenerator.generateId();
  };

  service.hooks(hooks);
};
