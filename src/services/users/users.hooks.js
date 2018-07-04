const {createUserWorkspace, getUserWorkspace} = require('../../hooks');

module.exports = {
  before: {
    all: [],
    find: [ctx => {
      return ctx;
    }],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
    ],
    find: [],
    get: [getUserWorkspace()],
    create: [createUserWorkspace()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
