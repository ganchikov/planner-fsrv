const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz([permissions.team.read])],
    get: [jwtauthz([permissions.team.read])],
    create: [jwtauthz([permissions.team.edit])],
    update: [jwtauthz([permissions.team.edit])],
    patch: [jwtauthz([permissions.team.edit])],
    remove: [jwtauthz([permissions.team.edit])]
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
