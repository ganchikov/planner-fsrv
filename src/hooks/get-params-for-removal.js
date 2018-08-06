// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const subjectId = context.id ? context.id : context._id;
    context.params.query._id = subjectId;
    context.id = null;
    return context;
  };
};
