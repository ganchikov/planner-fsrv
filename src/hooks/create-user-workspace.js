const routeBuilder = require('../helpers/routebuilder');
const {workspace} = require('../constants/services');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const user = context.result;
    const workspaceSvc = context.app.service(routeBuilder(context.app, workspace));
    const result = await workspaceSvc.create({user},{headers: context.params.headers, sessionData: context.params.sessionData});
    context.result.workspace = result._id;    
    return context;
  };
};
