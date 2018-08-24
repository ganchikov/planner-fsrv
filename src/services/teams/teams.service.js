// Initializes the `teams` service on path `/teams`
const createService = require('feathers-mongoose');
const routeBuilder = require('@helpers/routebuilder');
const createModel = require('@models/teams.model');
const hooks = require('./teams.hooks');


const {idgenerator, teams} = require('@constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: teams,
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const route = routeBuilder(app, teams);

  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);
  
  service._addChildren = async (item) => {    
    await Model.populate(item, {path: 'members', populate: {path: 'absences'}}); 
  };

  service.generateId = async(item) => {
    const idGenerator = app.service(routeBuilder(app, idgenerator));   
    item.id = await idGenerator.generateId();
  };

  service.hooks(hooks);
};
