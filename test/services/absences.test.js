const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/services/routebuilder');

describe('\'absences\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder('absences'));

    assert.ok(service, 'Registered the service');
  });

  it('creates the record with id', () => {
    
  });
});
