// Initializes the `teams-calendar` service on path `/teams-calendar`

const routeBuilder = require('@helpers/routebuilder');
const {teams} = require('@constants/services');
const createService = require('./teams-calendar.class.js');
const hooks = require('./teams-calendar.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'teams-calendar',
    paginate,
    teamsService: app.get(routeBuilder(app,teams))
  };

  // Initialize our service with any options it requires
  app.use('/teams-calendar', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('teams-calendar');

  service.hooks(hooks);
};
