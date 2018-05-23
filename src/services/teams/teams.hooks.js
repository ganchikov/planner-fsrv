const jwtauthz = require('../../hooks/jwt-authz');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz(['read:team-api'])],
    get: [jwtauthz(['read:team-api'])],
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
