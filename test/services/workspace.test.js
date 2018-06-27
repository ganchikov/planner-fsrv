const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {workspace} = require('../../src/constants/services');

describe('\'workspace\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, workspace));

    assert.ok(service, 'Registered the service');
  });
});
