// Initializes the `data-loader` service on path `/loader`
const createService = require('./data-loader.class.js');
const hooks = require('./data-loader.hooks');
const {teams, people, absences, dataloader} = require('../../constants/services');
const routeBuilder = require('../../helpers/routebuilder');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const teamsService = app.service(routeBuilder(app, teams));
  const peopleService = app.service(routeBuilder(app, people));
  const absencesService = app.service(routeBuilder(app, absences));

  const route = routeBuilder(app, dataloader);

  const options = {
    name: dataloader,
    paginate,
    teamsService,
    peopleService,
    absencesService
  };

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.hooks(hooks);
};
