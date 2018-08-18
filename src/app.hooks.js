// Application hooks that run for every service
const {logger, generateId, 
  getChildren, removeChildren, 
  getDiff, processDiff,
  checkAccessToken, authenticateUser} = require('@hooks');

module.exports = (app) => {
  return {
    before: {
      all: [checkAccessToken(app), authenticateUser(), logger()],
      find: [],
      get: [],
      create: [generateId()],
      update: [],
      patch: [getDiff()],
      remove: []
    },

    after: {
      all: [logger()],
      find: [ getChildren()],
      get: [getChildren()],
      create: [],
      update: [],
      patch: [processDiff()],
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
