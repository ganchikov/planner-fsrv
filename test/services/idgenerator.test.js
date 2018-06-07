const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {idgenerator} = require('../../src/constants/services');

describe('\'idgenerator\' service', function() {
  this.timeout(15000);
  const service = app.service(routeBuilder(app, idgenerator));

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('generates id', async () => {
    const id = await service.generateId('test');    
    assert.ok(id, 'generated new id');
    const prevId = await service.getLastId('test');    
    assert.equal(prevId, id, 'retrieved previously generated id');

  });


});
