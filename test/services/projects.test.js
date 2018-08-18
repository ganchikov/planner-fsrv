const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {projects} = require('@constants/services');

describe('\'projects\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, projects));

    assert.ok(service, 'Registered the service');
  });
});
