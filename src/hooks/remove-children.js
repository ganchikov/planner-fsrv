// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const service = context.service;
    let removed_item;
    if (context.result.length) {
      removed_item = context.result[0];
    } else {
      removed_item = context.result;
    }
    if (service.removeChildren) {
      const result = await service.removeChildren(removed_item);
      context.result.children = result;
    }
    return context;  };
};
