const jwtauthz = require('../../hooks/jwt-authz');
const permissions = require('../../constants/permissions');

module.exports = {
  before: {
    all: [jwtauthz([permissions.projects.read])],
    find: [jwtauthz([permissions.projects.read])],
    get: [jwtauthz([permissions.projects.read])],
    create: [jwtauthz([permissions.projects.read])],
    update: [jwtauthz([permissions.projects.read])],
    patch: [jwtauthz([permissions.projects.read])],
    remove: [jwtauthz([permissions.projects.read])]
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
