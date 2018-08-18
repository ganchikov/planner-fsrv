const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {users} = require('@constants/services');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, users));
    assert.ok(service, 'Registered the service');
  });
});
