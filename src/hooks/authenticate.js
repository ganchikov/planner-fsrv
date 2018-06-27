// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    ///TODO: authenticate user
    //get active workspace from user settings
    //pass workspace id to service calls for filtering data

    return context;
  };
};
