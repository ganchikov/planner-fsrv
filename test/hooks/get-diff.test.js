const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const getDiff = require('../../src/hooks/get-diff');
// const {authentication} = require('../../src/constants/config');
// const jwtGen = require('../../src/helpers/jwt-gen');


describe('\'get-diff\' hook', () => {
  const app = feathers();

  beforeEach(() => {
    app.use('/dummy', {
      async patch(id, data) {
        return data;
      },

      async _getById(id) {
        return { id, param: 'origin' };
      }
    });

    app.service('dummy').hooks({
      before: {
        patch: [getDiff()]
      }, after: {
        patch: [async context => {
          context.result.diff = context.data.diff;
          return context;
        }]
      }
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').patch('test', {id: 'test', param: 'diff'});
    
    assert.deepEqual(result.diff, {param: 'diff' });
  });
});
