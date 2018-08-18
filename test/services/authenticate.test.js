const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {authenticate} = require('@constants/services');

describe('\'authenticate\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, authenticate));

    assert.ok(service, 'Registered the service');
  });
});
