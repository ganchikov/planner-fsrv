const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {absences} = require('../../src/constants/services');
const {MockJwt} = require('../../src/hooks');

describe('\'absences\' service', function() {
  this.timeout(15000);
  const service = app.service(routeBuilder(app, absences));
  service.hooks({
    before: [MockJwt()]
  });
  
  beforeEach(() => {
  });


  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('created the record', async () => {
    const result = await service.create({name: 'test'});
    const generatedId = result._id;
    assert.ok(result.hasOwnProperty('id'), 'service created record');
    const createdRecord = await service.get(generatedId);
    assert.strictEqual(createdRecord.name, 'test', 'service retrieved created record');
  });

  

});
