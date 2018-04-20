// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const Services = require('../constants/services');

module.exports = function () {
  return async context => {
    const service = context.service;
    const items = context.result.data;
    if (service.getChildren) {
      await service.getChildren(items);
    }
    return context;
  };
};
