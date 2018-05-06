const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');


describe('\'people\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder('people'));

    assert.ok(service, 'Registered the service');
  });
});
