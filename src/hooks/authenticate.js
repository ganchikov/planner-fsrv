const { UnauthorizedError } = require('../errors');
const {Config} = require('../constants');
const request = require('request');
const RequestError = require('../errors/RequestError');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    ///TODO: authenticate user
    //get active workspace from user settings
    //pass workspace id to service calls for filtering data
    const data = context.data;
    if (!data) {
      throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
    } else if(!data.user || !data.token) {
      throw new UnauthorizedError('credentials_required', { message: 'Wrong authorization data provided' });
    } else if (data.userInfo) {
      //user info data is already fetched
      return context;
    }
    ///TODO: fetch user data from db before fetching from server

    const config = context.app.get(Config.authentication);
    const authsrvUrl = config.auth0.audience;
    const userInfo = new Promise((resolve, reject) => {
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
          }
          reject(err);
        }      
        var userInfo = res.body.keys;
        resolve(userInfo);
      });
    });
    if (userInfo) {
      ///TODO: store userInfo in database
      context.data.userInfo = userInfo;
      return userInfo;
    }


    return context;
  };
};
