const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');


describe('\'teams\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder('teams'));

    assert.ok(service, 'Registered the service');
  });
});
