const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz([permissions.workspace.read])],
    get: [jwtauthz([permissions.workspace.read])],
    create: [jwtauthz([permissions.workspace.read])],
    update: [jwtauthz([permissions.workspace.read])],
    patch: [jwtauthz([permissions.workspace.read])],
    remove: [jwtauthz([permissions.workspace.read])]
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
