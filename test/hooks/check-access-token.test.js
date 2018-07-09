const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkJwt = require('../../src/hooks/check-access-token');
const configuration = require('@feathersjs/configuration');
const {authentication} = require('../../src/constants/config');

const routeBuilder = require('../../src/helpers/routebuilder');
const {jwks} = require('../../src/constants/services');
const jwtGen = require('../utils/get-jwt');


describe('\'check-access-token\' hook', () => {
  const app = feathers();
  app.configure(configuration());
  let authConfig = app.get(authentication);

  const jwt = new jwtGen(authConfig);


  beforeEach(() => {

    //mock jwks service to return fake jwks
    app.use(routeBuilder(app, jwks), {
      async find() {
        return jwt.getJwks();
      }
    });

    app.use('/dummy', {
      async get(item) {
        return item;
      },

    });

    app.service('dummy').hooks({
      before: checkJwt(app)
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test', {headers: {authorization: 'BEARER ' + jwt.getJwt().compact()}});
    assert.deepEqual(result, 'test');
  });
});
