const routeBuilder = require('@helpers/routebuilder');
const {authentication} = require('@constants/config');
const {authenticate} = require('@constants/services');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const config = context.app.get(authentication);
    if (!config.enabled) {
      return context;                
    }
    const authId = context.data.authId;
    const authSvc = context.app.service(routeBuilder(context.app, authenticate));
    context.sessionData.authenticating = true;

    const result = await authSvc.find({query: {authId}, headers: context.params.headers, sessionData: context.sessionData});
    if (result.data.length > 0) {
      context.result = result;
    }
    context.sessionData.authenticating = false;

    return context;
  };
};
