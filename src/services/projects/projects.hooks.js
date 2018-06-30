const {JwtAuthz} = require('../../hooks');
const {Permissions} = require('../../constants');

module.exports = {
  before: {
    all: [JwtAuthz([Permissions.projects.read])],
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
