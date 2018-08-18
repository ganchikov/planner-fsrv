const {getUserInfo, checkUserAuthentication} = require('@hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [getUserInfo(), checkUserAuthentication()],
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