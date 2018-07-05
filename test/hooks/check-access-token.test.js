const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkJwt = require('../../src/hooks/check-access-token');
const configuration = require('@feathersjs/configuration');
const {authentication} = require('../../src/constants/config');
const njwt = require('njwt');
const secureRandom = require('secure-random');
const express = require('@feathersjs/express');

const signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes


describe('\'check-access-token\' hook', () => {
  const app = express(feathers());
  app.configure(configuration());
  let authConfig = app.get(authentication);

  const claims = {
    iss: authConfig.jwt.issuer,
    aud: authConfig.jwt.audience,
  };

  const jwt = njwt.create(claims, signingKey, authConfig.jwt.algorithm);
  jwt.setHeader('kid', '1');

  // const port = app.get('port');
  app.use('/.well-known/jwks.json', (req, res) => {
    const resObj = {
      keys: [
        {
          alg: authConfig.jwt.algorithm,
          kty: 'RSA',
          use: 'sig',
          x5c: signingKey,
          kid: '1'
        }
      ]
    };
    res.send(resObj);
  });
  // app.listen(port);

  beforeEach(() => {


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
    const result = await app.service('dummy').get('test', {headers: {authorization: 'BEARER ' + jwt.compact()}});
    assert.deepEqual(result, 'test');
  });
});
