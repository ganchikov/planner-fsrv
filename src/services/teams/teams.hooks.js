const jwtauthz = require('../../hooks/jwt-authz');

module.exports = {
  before: {
    all: [],
    find: [jwtauthz(['read:teams-api'])],
    get: [jwtauthz(['read:teams-api'])],
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
