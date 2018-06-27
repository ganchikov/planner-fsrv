const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [jwtauthz([permissions.tasks.read])],
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
