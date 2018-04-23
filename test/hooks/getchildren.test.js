const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const getchildren = require('../../src/hooks/getchildren');

describe('\'getchildren\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        const result = {data: {id, children: []}};
        return result;
      },

      async getChildren(item) {
       
        item.children = [{child: 'test'}];
        
        return item;
      }
    });

    app.service('dummy').hooks({
      after: getchildren()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, {data: {id: 'test', children: [{child: 'test'}]}});
  });
});
