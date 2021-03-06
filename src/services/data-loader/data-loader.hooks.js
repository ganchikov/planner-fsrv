const {jwtAuthz} = require('@hooks');
const {Permissions} = require('@constants');

module.exports = {
  before: {
    all: [jwtAuthz([Permissions.dataloader.use])],
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
