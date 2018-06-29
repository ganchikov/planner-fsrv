// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options) {
  return async context => {
    context.sessionData = {
      user: options ? options.user : {},
      token: options ? options.token : '',
      userInfo: options ? options.userInfo : {}
    };
    return context;

  };
};
