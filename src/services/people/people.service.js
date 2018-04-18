// Initializes the `people` service on path `/people`
const createService = require('feathers-mongoose');
const createModel = require('../../models/people.model');
const hooks = require('./people.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'people',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/people', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('people');

  service.hooks(hooks);
};
