// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const routeBuilder = require('../../helpers/routebuilder');
const {users} = require('../../constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  const route = routeBuilder(app, users);
  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.find = async (params) => {
    const authId = params.authId; 
    const result = {
      data: []
    };
    if (authId) {
      const item = await Model.findOne({authId}).exec();
      if (item) {
        result.data.push(item);
      }
    } else {
      result.data = await Model.find().exec();
    }
    return result;
    
  };

  service.hooks(hooks);
};
