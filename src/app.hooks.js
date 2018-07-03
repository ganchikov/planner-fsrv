// Application hooks that run for every service
const logger = require('./hooks/logger');
const generateId = require('./hooks/generate-id');
const getchildren = require('./hooks/getchildren');
const {checkAccessToken, authenticateUser} = require('./hooks');

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
      find: [ getchildren()],
      get: [getchildren()],
      create: [],
      update: [],
      patch: [],
      remove: []
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
