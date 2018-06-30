const getUserInfo = require('./getUserInfo');
const expressJwtSecret = require('../get-jwt-secret/expressJwtSecret');
const {authentication} = require('../../constants/config');

module.exports = (app) => {
  const authConfig = app.get(authentication);
  return getUserInfo(
    {
      secret: expressJwtSecret({
        jwksUri: authConfig.auth0.jwksUri,
        strictSsl: authConfig.auth0.strictSsl
      }),
      authConfig
      // // Validate the audience and the issuer.
      // audience: authConfig.jwt.audience,
      // issuer: authConfig.jwt.issuer,
      // algorithms: [authConfig.jwt.algorithm]
    });
};