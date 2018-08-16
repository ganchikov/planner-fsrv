// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const diff = context.data.diff;
    const service = context.service;
    if (service._processDiff) {
      const result = await service._processDiff(context.data, diff);
      context.result.diff = context.data.diff;
      context.result.diff._processedResult = result;
    }
    return context;
  };
};
