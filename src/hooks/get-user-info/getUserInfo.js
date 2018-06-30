const jwt = require('jsonwebtoken');
const {RequestError, UnauthorizedError} = require('../../errors');
const routeBuilder = require('../../helpers/routebuilder');
const {users} = require('../../constants/services');


// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  
  const secretCallback = options.secret;
  const authConfig = options.authConfig;

  return async context => {
    // parse context data for id_token data to get user details, find relevant user id and pass it to the authorize service
    try {
      if (!authConfig.enabled) {
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

      if (decodedToken.header.alg !== 'RS256') {
      // we are only supporting RS256 so fail if this happens.
          throw new Error();
      }

      const userInfo = {
        auth0Id: decodedToken.payload.sub,        
        name: decodedToken.payload.name,
        nick: decodedToken.payload.nickname
      };

      const userService = context.app.service(routeBuilder(context.app, users));
      let user = await userService.find({auth0Id: userInfo.auth0Id, headers: context.params.headers});
      if (!user) {
        user = await userService.create(userInfo);
      }

          
      // const secret = await secretCallback(decodedToken.header, decodedToken.payload);
      // const result = await new Promise((resolve, reject) => {
      //     jwt.verify(token, secret, options, function(err, decoded) {
      //         if (err) {
      //             reject(new UnauthorizedError('invalid_token', err));
      //         } else {
      //             resolve(decoded);
      //         }
      //     });
      // }); 
      // if (!context.sessionData) {                
      //     context.sessionData = {user: result, token};
      // } else {
      //     context.sessionData.user = result;
      //     context.sessionData.token = token;
      // }
      
      // return context;

      return context;      
    }
    catch (err) {
      throw err;
    }
  };
};
