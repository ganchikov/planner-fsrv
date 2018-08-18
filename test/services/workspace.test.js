const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {workspace} = require('@constants/services');

describe('\'workspace\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, workspace));

    assert.ok(service, 'Registered the service');
  });
});
