const extractToken = require('../helpers/extract_token');
const routeBuilder= require('../helpers/routebuilder');
const {authenticate} = require('../constants/services');
const {UnauthorizedError} = require('../errors');
const hasher = require('string-hash');


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
    const token_hash = hasher(token);

    context.sessionData.authenticating = true;
    const authSvc = context.app.service(routeBuilder(context.app, authenticate));
    const result = await authSvc.find({token: token_hash, headers: context.params.headers, sessionData: context.sessionData});
    if (!result || !result.data || result.data.length === 0) {
      throw new UnauthorizedError('need_authentication', {message: 'Authentication required'});
    }
    const userId = result.data[0].user;
    const workspaceId = result.data[0].workspace;

    if (!context.sessionData) {
      context.sessionData = {
        user: userId,
        workspace: workspaceId
      };
    } else {
      context.sessionData.user = userId;
      context.sessionData.workspace = workspaceId;
    }
    context.sessionData.authenticating = false;
    return context;
  };
};
