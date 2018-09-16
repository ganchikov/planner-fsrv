// Initializes the `people` service on path `/people`
const createService = require('feathers-mongoose');
const routeBuilder = require('@helpers/routebuilder');
const createModel = require('@models/people.model');
const hooks = require('./people.hooks');
const {idgenerator, people, absences} = require('@constants/services');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'people',
    Model,
    paginate
  };
  const route = routeBuilder(app, people);

  // Initialize our service with any options it requires
  app.use(route, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route);
  const absencesSvc = app.service(routeBuilder(app, absences));

  service._getPeople = async (query) => {
    const result = await Model.find(query).lean().exec();
    return result;
  };  

  service._addChildren = async (item) => {    
    item.absences = await service._getChildren(item);
  };

  service._getChildren = async (item) => {
    const absences = await absencesSvc._getByPerson(item._id);
    return absences;
  };

  service.removeChildren = async (person) => {
    const result = await absencesSvc._removeByPerson(person._id);
    return result;
  };

  service.generateId = async(item) => {
    const idGenerator = app.service(routeBuilder(app, idgenerator));   
    item.id = await idGenerator.generateId();
  };

  service._getById = async (itemId) => {
    const item = await Model.findById(itemId);
    return item;
  };

  service._processDiff = async (person, diff) => {
    // if (diff.absences) {
    //   const result = await absencesSvc._removeMany(diff.absences);
    //   return result;
    // }
  };

  service.hooks(hooks);
};
