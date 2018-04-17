const teams = require('./teams/teams.service.js');
const idgenerator = require('./idgenerator/idgenerator.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(teams);
  app.configure(idgenerator);
};
