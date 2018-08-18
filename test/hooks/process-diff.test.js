const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {processDiff} = require('@hooks');

describe('\'process-diff\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async patch(id, data) {
        return data;
      },

      async _processDiff(data, diff) {
        return 'processed';
      }
    });

    app.service('dummy').hooks({
      before: {
        patch: [async context => {
          context.data.diff = {param: 'diff'};
        }]
      },
      after: {
        patch: [processDiff()]
      }
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').patch('test', {id: 'test', param: 'diff'});
    
    assert.deepEqual(result.diff, { param: 'diff', _processedResult: 'processed' });
  });
});
