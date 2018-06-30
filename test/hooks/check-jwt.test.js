const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkJwt = require('../../src/hooks/check-jwt');
const configuration = require('@feathersjs/configuration');

describe('\'check-jwt\' hook', () => {
  let app;

  beforeEach(() => {
    let conf = configuration();
    app = feathers().configure(conf);

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
    const result = await app.service('dummy').get('test');
    assert.deepEqual(result, 'test');
  });
});
