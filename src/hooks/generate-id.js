// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const Services = require('../constants/services');

module.exports = function (options = {}) {
  return async context => {
    const idGenerator = context.app.service(Services.idgenerator);
    const item = context.data;
    item.id = await idGenerator.generateId(context.path);
    return context;
  };
};
