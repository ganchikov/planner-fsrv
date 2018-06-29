const {JwtAuthz} = require('../../hooks');
const {Permissions} = require('../../constants');

module.exports = {
  before: {
    all: [],
    find: [JwtAuthz([Permissions.workspace.read])],
    get: [JwtAuthz([Permissions.workspace.read])],
    create: [JwtAuthz([Permissions.workspace.edit])],
    update: [JwtAuthz([Permissions.workspace.edit])],
    patch: [JwtAuthz([Permissions.workspace.edit])],
    remove: [JwtAuthz([Permissions.workspace.edit])]
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
