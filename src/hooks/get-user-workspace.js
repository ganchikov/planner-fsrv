const routeBuilder = require('../helpers/routebuilder');
const {workspace} = require('../constants/services');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const result = context.result;
    if (result.data.length===0) {
      return context;
    }
    const user = result.data[0];
    const workspaceSvc = context.app.service(routeBuilder(context.app, workspace));
    const res = await workspaceSvc.find({user, headers: context.params.headers, sessionData: context.params.sessionData});
    result.workspace = res.data[0]._id;    
    return context;
  };
};
