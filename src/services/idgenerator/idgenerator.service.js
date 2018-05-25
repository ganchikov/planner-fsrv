// Initializes the `idgenerator` service on path `/idgenerator`
const createService = require('feathers-mongoose');
const routeBuilder = require('../../helpers/routebuilder');
const createModel = require('../../models/idgenerator.model');
const {idgenerator} = require('../../constants/services');
const hooks = require('./idgenerator.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const route = routeBuilder(app, idgenerator);

  const options = {
    name: idgenerator,
    Model,
    paginate
  };
  
  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.generateId = async (counter_id) => {
    
    ///TODO: consider moving this logic to post select hooks as it is required for UI only to render dhtmlx chart properly
    // if (!counter_id) {counter_id = 'universal';}
    counter_id = 'universal';

    let counter = await Model.findOneAndUpdate({counter_id}, {$inc: {sequence_val: 1}}, {new: true}).exec();
    if (!counter) {
      counter = await Model.create({counter_id});
    }
    // console.log('find invoked');
    return counter.sequence_val;
    
  };

  service.hooks(hooks);
};
