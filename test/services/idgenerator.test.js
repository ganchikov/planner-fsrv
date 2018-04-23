const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/services/routebuilder');


describe('\'idgenerator\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder('idgenerator'));

    assert.ok(service, 'Registered the service');
  });
});
