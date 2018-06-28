const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz([permissions.workspace.read])],
    get: [jwtauthz([permissions.workspace.read])],
    create: [jwtauthz([permissions.workspace.edit])],
    update: [jwtauthz([permissions.workspace.edit])],
    patch: [jwtauthz([permissions.workspace.edit])],
    remove: [jwtauthz([permissions.workspace.edit])]
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
