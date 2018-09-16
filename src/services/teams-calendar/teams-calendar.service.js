// Initializes the `teams-calendar` service on path `/teams-calendar`

const routeBuilder = require('@helpers/routebuilder');
const {teams, people, teams_calendar} = require('@constants/services');
const createService = require('./teams-calendar.class.js');
const hooks = require('./teams-calendar.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'teams-calendar',
    paginate,
    teamsService: app.service(routeBuilder(app,teams)),
    peopleService: app.service(routeBuilder(app, people))
  };

  const route = routeBuilder(app, teams_calendar );
  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.hooks(hooks);
};
