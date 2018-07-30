const app = require('../../src/app');
const assert = require('assert');
const authenticateUser = require('../../src/hooks/authenticate-user');
const routeBuilder = require('../../src/helpers/routebuilder');
const {authenticate} = require('../../src/constants/services');
const {authentication} = require('../../src/constants/config');
const jwtGen = require('../../src/helpers/jwt-gen');

describe('\'authenticate-user\' hook', function () {
  this.timeout(15000);
  
  const jwt = new jwtGen(app.get(authentication));
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  const authSvc = app.service(routeBuilder(app, authenticate));
  const accessToken = jwt.getAccessToken();

  app.use('/dummy', {
    async get(id) {
      return { id };
    }
  });

  app.service('dummy').hooks({
    before: {
      all: [authenticateUser()]
    }
  });

  beforeEach(async () => {

    const result = await authSvc.find({query: {authId: accessToken.body.sub}, headers});
    if (result.data.length > 0) {
      for (const itm of result.data) {
        await authSvc.remove(itm._id, {headers});
      }
    } 

  });

  it('fails if no authentication header provided', async () => {
    try {
      const result = await app.service('dummy').get('test', {headers});
      assert.deepEqual(result, { id: 'test' });
      
    } 
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');      
    }
  });

  it('fails if no authentication record exists', async () => {
    try {
      const result = await app.service('dummy').get('test', {headers});
      assert.deepEqual(result, { id: 'test' });      
    }
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');            
    }
  });

  it('passes if authentication record exists', async () => {
    await app.service(routeBuilder(app, authenticate)).create({id_token: jwt.getIdToken().compact()}, {headers});
    const result = await app.service('dummy').get('test', {headers});
    assert.deepEqual(result, { id: 'test' });
  });

  ///TODO: implement this test
  // it('passes workspace to the target method', async () => {
  //   assert.equal(1,1);
  // });
  
});
