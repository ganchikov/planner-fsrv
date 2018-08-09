// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const service = context.service;
    const removed_id = context.result._id;
    if (service.removeChildren) {
      await service.removeChildren(removed_id);
    }
    return context;  };
};
