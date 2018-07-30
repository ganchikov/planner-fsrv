const assert = require('assert');
const app = require('../../src/app');

const getUserInfo = require('../../src/hooks/get-user-info');
const {authentication} = require('../../src/constants/config');
const jwtGen = require('../../src/helpers/jwt-gen');

describe('\'get-user\' hook', () => {
  const authSettings = app.get(authentication);
  const jwt = new jwtGen(authSettings);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};

  beforeEach(() => {

    app.use('/dummy', {
      async create(data) {
        return { data };
      }
    });

    app.service('dummy').hooks({
      before: {
        all: [getUserInfo()]
      }
    });
  });

  it('runs the hook and returns authId in context.data', async () => {
    const result = await app.service('dummy').create({id_token: jwt.getIdToken().compact()}, {headers});
    assert.ok(result, 'result is not retrieved');
    assert.ok(result.data, 'result does not contains data object');
    assert.ok(result.data.authId, 'result data object does not contain authId property');
    assert.strictEqual(result.data.authId, authSettings.mockJwt.sub, 'authId property does not equal to JWT sub property');
  });

  ///TODO: implement this test
  // it('passes user data to the called method', async () => {
  //   assert(1,1);
  // });
});
