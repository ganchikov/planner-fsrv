// Initializes the `teams` service on path `/teams`
const createService = require('feathers-mongoose');
const createModel = require('../../models/teams.model');
const hooks = require('./teams.hooks');

const {teams} = require('../../constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: teams,
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/teams', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(teams);

  service.getChildren = async (items) => {    
    if (!items || !(items instanceof Array) ) return;
    for (const item of items) {
      await Model.populate(item, {path: 'members', populate: {path: 'absences'}}); 
    }
  };

  service.hooks(hooks);
};
