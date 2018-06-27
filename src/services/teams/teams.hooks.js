const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz([permissions.teams.read])],
    get: [jwtauthz([permissions.teams.read])],
    create: [jwtauthz([permissions.teams.edit])],
    update: [jwtauthz([permissions.teams.edit])],
    patch: [jwtauthz([permissions.teams.edit])],
    remove: [jwtauthz([permissions.teams.edit])]
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
