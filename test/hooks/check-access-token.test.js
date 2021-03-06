const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const {checkAccessToken} = require('@hooks');
const {authentication} = require('@constants/config');
const jwtGen = require('@helpers/jwt-gen');

describe('\'check-access-token\' hook', function () {
  this.timeout(15000);
  
  const app = feathers();
  app.configure(configuration());
  let authConfig = app.get(authentication);

  const jwt = new jwtGen(authConfig);


  beforeEach(() => {


    app.use('/dummy', {
      async get(item) {
        return item;
      },

    });

    app.service('dummy').hooks({
      before: checkAccessToken(app)
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test', {headers: {authorization: 'BEARER ' + jwt.getAccessToken().compact()}});
    assert.deepEqual(result, 'test');
  });

  it('throws UnauthorizedError if no token provided', async() => {
    try {
      await app.service('dummy').get('test', {headers: {}});
    }
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');
    }
  });

  it('throws UnauthorizedError if bad token provided', async() => {
    try {
      await app.service('dummy').get('test', {headers: {authorization: 'BEARER' + '12345'}});
    }
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');
    }
  });
});
