// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const Services = require('../constants/services');

module.exports = function (options = {}) {
  return async context => {
    const teamService = context.app.service(Services.teams);
    const items = context.result.data;
    await teamService.getChildren(items);
    return context;
  };
};
