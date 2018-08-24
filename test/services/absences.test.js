const assert = require('assert');
const app = require('@src/app');
const {absences, authenticate} = require('@constants/services');
const {authentication} = require('@constants/config');
const routeBuilder = require('@helpers/routebuilder');
const jwtGen = require('@helpers/jwt-gen');


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
      await tgtService.find({headers});
    }
    catch (err) {
      assert.equal(err.name, 'UnauthorizedError', 'error is not UnauthorizedError');      
    }
  });

  it('created the record', async () => {
    const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});
    const result = await tgtService.create({name: 'test', person: null}, {headers});
    const generatedId = result._id;
    assert.ok(result.hasOwnProperty('id'), 'service created record');
    const createdRecord = await tgtService.get(generatedId, {headers: {authorization: 'BEARER ' + jwt.getAccessToken().compact()}});
    assert.strictEqual(createdRecord.name, 'test', 'service retrieved created record');
  });

  

});
