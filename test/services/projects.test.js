const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {projects} = require('../../src/constants/services');

describe('\'projects\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, projects));

    assert.ok(service, 'Registered the service');
  });
});
