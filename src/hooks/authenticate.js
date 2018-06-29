const { UnauthorizedError } = require('../errors');
const {Config} = require('../constants');
const request = require('request');
const RequestError = require('../errors/RequestError');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const config = context.app.get(Config.authentication);
    if (!config.enabled) {
      //if authentication disabled we can't get user settings & retrieve his workspace id
      return context;
    }

    ///TODO: authenticate user
    //get active workspace from user settings
    //pass workspace id to service calls for filtering data
    const data = context.sessionData;
    if (!data) {
      throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
    } else if(data.user === undefined || data.token === undefined) {
      throw new UnauthorizedError('credentials_required', { message: 'Wrong authorization data provided' });
    } else if (data.userInfo) {
      //user info data is already fetched
      return context;
    }
    ///TODO: fetch user data from db before fetching from server

    const authsrvUrl = config.auth0.audience;
    const userInfo = await (new Promise((resolve, reject) => {
      request({
        uri: authsrvUrl,
        strictSsl: config.auth0.strictSsl,
        json: true
      }, (err, res) => {
        if (err || res.statusCode < 200 || res.statusCode >= 300) {
          if (res) {
            reject(new RequestError(res.statusCode, 
              res.statusMessage || `Http Error ${res.statusCode}`,
              res.body && (res.body.message || res.body),
              err)); 
          } else {
            reject(err);
          }          
        } else {   
          var userInfo = res.body.keys;
          resolve(userInfo);
        }
      });
    }));
    if (userInfo) {
      ///TODO: store userInfo in database
      context.data.userInfo = userInfo;
    }
    return context;
  };
};
