const {getUserInfo, getUserAuthentication} = require('../../hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [getUserInfo(), getUserAuthentication()],
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