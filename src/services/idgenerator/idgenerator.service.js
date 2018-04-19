// Initializes the `idgenerator` service on path `/idgenerator`
const createService = require('feathers-mongoose');
const routeBuilder = require('../routebuilder');
const createModel = require('../../models/idgenerator.model');
const hooks = require('./idgenerator.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'idgenerator',
    Model,
    paginate
  };
  const route = routeBuilder('idgenerator');

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.generateId = async (counter_id) => {
    
    if (!counter_id) {counter_id = 'universal';}

    let counter = await Model.findByIdAndUpdate(counter_id, {$inc: {sequence_val: 1}}, {new: true}).exec();
    if (!counter) {
      counter = await Model.create({_id: counter_id});
    }
    // console.log('find invoked');
    return counter.sequence_val;
    
  };

  service.hooks(hooks);
};
