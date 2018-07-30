const extractToken = require('../helpers/extract_token');
const routeBuilder= require('../helpers/routebuilder');
const {authenticate} = require('../constants/services');
const {UnauthorizedError} = require('../errors');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    
    if ('/' + context.path === routeBuilder(context.app, authenticate) || 
      (context.params.sessionData && context.params.sessionData.authenticating)) {
      // we should ignore this hook when requesting authenticate service
      //since there is a getUserInfo hook needs to be run instead
      return context;
    }

    const authHeader = context.params.headers.authorization;
    const token = extractToken(authHeader);
    const decodedToken = jwt.decode(token, {complete: true});
    
    context.sessionData.authenticating = true;
    const authSvc = context.app.service(routeBuilder(context.app, authenticate));
    const result = await authSvc.find({query: {authId: decodedToken.payload.sub}, headers: context.params.headers, sessionData: context.sessionData});
    if (!result || !result.data || result.data.length === 0) {
      throw new UnauthorizedError('need_authentication', {message: 'Authentication required'});
    }
    const workspaceId = result.data[0].workspace;
    //set workspace parameter for further filtering
    if (context.data) {
      context.data.workspace = workspaceId;
    } else if(context.params && context.params.query) {
      context.params.query.workspace = workspaceId;
    }
    context.sessionData.authenticating = false;
    return context;
  };
};
