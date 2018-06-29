const { authenticate } = require('@feathersjs/authentication').hooks;
const {JwtAuthz} = require('../../hooks');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [async context => {
      
      return context;
    }, authenticate(['jwt','auth0']) ],
    get: [ JwtAuthz(['read:team-api'])],
    create: [hashPassword() ],
    update: [ hashPassword(),  authenticate(['jwt','auth0']) ],
    patch: [ hashPassword(),  authenticate(['jwt','auth0']) ],
    remove: [ authenticate(['jwt','auth0']) ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
