// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const Services = require('@constants/services');

module.exports = function () {
  return async context => {
    const service = context.service;
    const result = context.result;
    if (service._addChildren) {
      if (result.data) {
        for (const item of result.data) {
          await service._addChildren(item);
        }
      } else {
        await service._addChildren(result);
      }
    }
    return context;
  };
};
