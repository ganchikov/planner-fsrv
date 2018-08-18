const checkJwt = require('./checkJwt');
const getJwtSecret = require('./getJwtSecret');
const {authentication} = require('@constants/config');
const {jwks} = require('@constants/services');
const routeBuilder = require('@helpers/routebuilder');

module.exports = (app) => {
  const config = app.get(authentication);
  const jwksService = app.service(routeBuilder(app, jwks));
  return checkJwt(
    {
      secret: getJwtSecret(config, jwksService),
      config
    });
};