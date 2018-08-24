const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {addChildren} = require('@hooks');

describe('\'addchildren\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        const result = {id};
        return result;
      },

      async find(request) {
        const id = request.id;
        const result = {data: [{id}]};
        return result;
      },  

      async _addChildren(item) {
        item.children = [{child: 'test'}];        
        return item;
      }
    });

    app.service('dummy').hooks({
      after: addChildren()
    });
  });

  it('runs the hook with get method', async () => {
    const result = await app.service('dummy').get('test');
    assert.deepEqual(result, {id: 'test', children: [{child: 'test'}]});
  });

  it('runs the hook with find method', async () => {
    const result = await app.service('dummy').find({id: 'test'});
    assert.deepEqual(result, {data: [{id: 'test', children: [{child: 'test'}]}]});

  });
});
