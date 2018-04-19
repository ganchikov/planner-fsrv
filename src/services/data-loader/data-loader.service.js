// Initializes the `data-loader` service on path `/loader`
const createService = require('./data-loader.class.js');
const hooks = require('./data-loader.hooks');
const {teams, people, absences} = require('../../constants/services');
const routeBuilder = require('../routebuilder');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const teamsService = app.service(routeBuilder(teams));
  const peopleService = app.service(routeBuilder(people));
  const absencesService = app.service(routeBuilder(absences));

  const options = {
    name: 'data-loader',
    paginate,
    teamsService,
    peopleService,
    absencesService
  };

  const route = routeBuilder('loader');
  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.hooks(hooks);
};
