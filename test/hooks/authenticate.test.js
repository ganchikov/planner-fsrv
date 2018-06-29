const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const {MockJwt, Authenticate} = require('../../src/hooks');


describe('\'authenticate\' hook', () => {
  let app;

  beforeEach(() => {
    let conf = configuration();
    app = feathers().configure(conf);

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: [
      MockJwt(),
      Authenticate()
      ]
    });

  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
