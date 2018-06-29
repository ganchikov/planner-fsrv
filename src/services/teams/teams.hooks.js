const {JwtAuthz} = require('../../hooks');
const {Permissions} = require('../../constants');

module.exports = {
  before: {
    all: [],
    find: [JwtAuthz([Permissions.teams.read])],
    get: [JwtAuthz([Permissions.teams.read])],
    create: [JwtAuthz([Permissions.teams.edit])],
    update: [JwtAuthz([Permissions.teams.edit])],
    patch: [JwtAuthz([Permissions.teams.edit])],
    remove: [JwtAuthz([Permissions.teams.edit])]
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
