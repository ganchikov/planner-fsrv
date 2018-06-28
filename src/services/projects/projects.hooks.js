const jwtauthz = require('../../hooks/jwt-authz');
const authenticate = require('../../hooks/authenticate');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [jwtauthz([permissions.projects.read]), authenticate()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
