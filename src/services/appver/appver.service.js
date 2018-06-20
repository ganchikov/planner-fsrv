// Initializes the `appver` service on path `/appver`
const createService = require('./appver.class.js');
const routeBuilder = require('../../helpers/routebuilder');
const {appver} = require('../../constants/services');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const route = routeBuilder(app,appver);

  const options = {
    paginate
  };

  const service = createService(options);
  
  app.use(route, async (req, res) => {
      const data = await service.find();
      res.status(200).send(`${data.version.major}.${data.version.minor}.${data.version.patch}.${data.build}`);      
  });

  // // Get our initialized service so that we can register hooks
  // const service = app.service(route);

  // service.hooks(hooks);
};
