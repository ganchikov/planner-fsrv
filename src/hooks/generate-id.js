// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const Services = require('../constants/services');

module.exports = function () {
  return async context => {
    const service = context.service;
    const item = context.data;
    if (service.generateId) {
      await service.generateId(item);
    }    
    return context;
  };
};
