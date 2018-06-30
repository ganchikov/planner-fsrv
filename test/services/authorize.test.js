const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {authorize} = require('../../src/constants/services');

describe('\'authorize\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, authorize));

    assert.ok(service, 'Registered the service');
  });
});
