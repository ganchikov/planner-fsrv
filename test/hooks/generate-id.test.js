const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {generateId} = require('@hooks');

describe('\'generate-id\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(item) {
        return { item };
      },

      async generateId(item) {
        return item.id = 'test';
      }
    });

    app.service('dummy').hooks({
      before: generateId()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').create({});
    
    assert.deepEqual(result, { item: {id: 'test' }});
  });
});
