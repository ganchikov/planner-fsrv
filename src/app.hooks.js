// Application hooks that run for every service
const {logger, generateId, 
  getChildren, removeChildren, 
  checkAccessToken, authenticateUser} = require('./hooks');

module.exports = (app) => {
  return {
    before: {
      all: [checkAccessToken(app), authenticateUser(), logger()],
      find: [],
      get: [],
      create: [generateId()],
      update: [],
      patch: [],
      remove: []
    },

    after: {
      all: [logger()],
      find: [ getChildren()],
      get: [getChildren()],
      create: [],
      update: [],
      patch: [],
      remove: [removeChildren()]
    },

    error: {
      all: [logger()],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  };
};
