

const generateId = require('../../hooks/generate-id');

const getchildren = require('../../hooks/getchildren');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [generateId()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getchildren()],
    get: [getchildren()],
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
