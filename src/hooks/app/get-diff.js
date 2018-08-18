const get_diff = require('@helpers/get_diff');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const service = context.service;
    if (service._getById) {
      const originId = context.id;
      const originItem = await service._getById(originId);
      const updatedItem = context.data;
      context.data.diff = get_diff(updatedItem, originItem);
    }
    return context;
  };
};