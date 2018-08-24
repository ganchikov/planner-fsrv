// Initializes the `absences` service on path `/absences`
const createService = require('feathers-mongoose');
const routeBuilder = require('@helpers/routebuilder');
const createModel = require('@models/absences.model');
const hooks = require('./absences.hooks');
const {idgenerator, absences} = require('@constants/services');


module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: absences,
    Model,
    paginate
  };

  const route = routeBuilder(app, absences);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);

  service.generateId = async(item) => {
    const idGenerator = app.service(routeBuilder(app, idgenerator));   
    item.id = await idGenerator.generateId();
  };

  service._getByPerson = async (person) => {
    ///TODO: Beware of hack here! for some reason need to transform result from model to Doc object
    const result = await Model.find().where('person').equals(person).exec();
    const resultDocs = result.map(itm => itm._doc);
    return resultDocs;
  };

  service._removeByPerson = async(ids) => {
    const result = await Model.deleteMany().where('person').in(ids).exec();
    return result;
  };

  service.hooks(hooks);
};
