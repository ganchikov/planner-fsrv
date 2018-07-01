const getUserInfo = require('./getUserInfo');
const {authentication} = require('../../constants/config');

module.exports = (app) => {
  const config = app.get(authentication);
  return getUserInfo(config);
};