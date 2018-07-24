const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {absences, authenticate} = require('../../src/constants/services');
const {authentication} = require('../../src/constants/config');
const jwtGen = require('../../src/helpers/jwt-gen');


describe('\'absences\' service', function() {
  this.timeout(15000);
  const authService = app.service(routeBuilder(app, authenticate));
  const tgtService = app.service(routeBuilder(app, absences));
  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  
  beforeEach(() => {
 
  });

  it('registered the service', () => {
    assert.ok(tgtService, 'Registered the service');
  });

  it('throws UnauthorizedError if user is not authenticated', async () => {
    try {
      const result = await tgtService.find();
    }
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');      
    }
  });

  it('created the record', async () => {
    const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});
    const result = await tgtService.create({name: 'test'}, {headers});
    const generatedId = result._id;
    assert.ok(result.hasOwnProperty('id'), 'service created record');
    const createdRecord = await tgtService.get(generatedId, {headers: {authorization: 'BEARER ' + jwt.getAccessToken().compact()}});
    assert.strictEqual(createdRecord.name, 'test', 'service retrieved created record');
  });

  

});
