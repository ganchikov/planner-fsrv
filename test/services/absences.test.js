const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {absences, jwks} = require('../../src/constants/services');
const {authentication} = require('../../src/constants/config');
const jwtGen = require('../utils/get-jwt');


describe('\'absences\' service', function() {
  this.timeout(15000);
  const service = app.service(routeBuilder(app, absences));
  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);
  
  
  beforeEach(() => {
 
    //mock jwks service to return fake jwks
    app.use(routeBuilder(app, jwks), {
      async find() {
        return jwt.getJwks();
      }
    });
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('created the record', async () => {
    const result = await service.create({name: 'test'}, {headers: {authorization: 'BEARER ' + jwt.getJwt().compact()}});
    const generatedId = result._id;
    assert.ok(result.hasOwnProperty('id'), 'service created record');
    const createdRecord = await service.get(generatedId, {headers: {authorization: 'BEARER ' + jwt.getJwt().compact()}});
    assert.strictEqual(createdRecord.name, 'test', 'service retrieved created record');
  });

  

});
