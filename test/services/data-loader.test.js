const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');


describe('\'data-loader\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder('loader'));

    assert.ok(service, 'Registered the service');
  });
});
