// Application hooks that run for every service
const logger = require('./hooks/logger');
const generateId = require('./hooks/generate-id');
const getchildren = require('./hooks/getchildren');
const checkJwt = require('./hooks/check-jwt');

const removeJwt = require('./hooks/remove-jwt');

const authenticate = require('./hooks/authenticate');

module.exports = {
  before: {
    all: [checkJwt(), authenticate(), logger()],
    find: [],
    get: [],
    create: [generateId()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [removeJwt(), logger()],
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
