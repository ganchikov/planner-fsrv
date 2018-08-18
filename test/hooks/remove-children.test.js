const app = require('../../src/app');
const assert = require('assert');
const {removeChildren} = require('@hooks');
const routeBuilder = require('@helpers/routebuilder');
const {authenticate} = require('@constants/services');
const {authentication} = require('@constants/config');
const jwtGen = require('@helpers/jwt-gen');

describe('\'remove-children\' hook', () => {
  const authSettings = app.get(authentication);
  const jwt = new jwtGen(authSettings);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  const authSvc = app.service(routeBuilder(app, authenticate));

  beforeEach(() => {

    app.use('/dummy', {
      async get(id) {
        return { id };
      },

      async remove(id) {
        return {_id: id};
      },

      async removeChildren(removed_item) {
        return [removed_item._id];
      }
    });

  });

  it('runs the hook', async () => {
    await authSvc.create({id_token: jwt.getIdToken().compact()}, {headers});

    const result = await app.service('dummy').remove('test', {headers});
    
    assert.deepEqual(result, {_id: 'test', children: ['test']});
  });
});
