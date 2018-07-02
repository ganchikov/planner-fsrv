const checkJwt = require('./checkJwt');
const getJwtSecret = require('./expressJwtSecret');
const {authentication} = require('../../constants/config');

module.exports = (app) => {
  const config = app.get(authentication);
  return checkJwt(
    {
      secret: getJwtSecret(config),
      config
    });
};