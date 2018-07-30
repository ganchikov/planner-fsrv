const jwt = require('jsonwebtoken');
const {RequestError, UnauthorizedError} = require('../errors');
const routeBuilder = require('../helpers/routebuilder');
const {authentication} = require('../constants/config');
const {users} = require('../constants/services');

// eslint-disable-next-line no-unused-vars
module.exports = function (config) {
  
  return async context => {
    // parse context data for id_token data to get user details, find relevant user id and pass it to the authorize service
    try {
      const config = context.app.get(authentication);
      if (!config.enabled) {
        return context;                
      }
      const token = context.data.id_token;
      if (!token) {
        throw new RequestError(400, 'missing_data', 'missing token data', null);
      }
       // This could fail.  If it does handle as 401 as the token is invalid.
      const decodedToken = jwt.decode(token, {complete: true});
       
      if (!decodedToken) {
          throw new UnauthorizedError('credentials_bad_token', {message: 'Bad token provided'});
      }

      const userInfo = {
        authId: decodedToken.payload.sub,        
        name: decodedToken.payload.name,
        nick: decodedToken.payload.nickname
      };
      
      context.sessionData.authenticating = true;

      const userService = context.app.service(routeBuilder(context.app, users));
      let res = await userService.find({query: {authId: userInfo.authId}, headers: context.params.headers, sessionData: context.sessionData});
      if (res.data.length != 0) {
        context.data.user = res.data[0]._id;  
        context.data.workspace = res.data[0].workspace;
      } else {        
        res = await userService.create(userInfo, {headers: context.params.headers, sessionData: context.sessionData});        
        context.data.user = res._id;  
        context.data.workspace = res.workspace;
      }
      context.data.authId = userInfo.authId;
          
      return context;      
    }
    catch (err) {
      throw err;
    }
  };
};
