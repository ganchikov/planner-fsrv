const assert = require('assert');
const app = require('../../src/app');
const {checkUserAuthentication, getUserInfo} = require('../../src/hooks');

const {authentication} = require('../../src/constants/config');
const jwtGen = require('../../src/helpers/jwt-gen');

describe('\'check-user-authentication\' hook', () => {

  const authSettings = app.get(authentication);
  const jwt = new jwtGen(authSettings);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};

  beforeEach(() => {

    app.use('/dummy', {
      async create(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: {
        get: [getUserInfo(), checkUserAuthentication()]
      }
    });
  });

  it('runs the hook', async () => {
    const id_token = jwt.getIdToken().compact();
    const result = await app.service('dummy').create({id_token}, {headers});
    assert.deepEqual(result.id_token, id_token);
  });
});
