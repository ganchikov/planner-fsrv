const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {teams} = require('@constants/services');

describe('\'teams\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, teams));

    assert.ok(service, 'Registered the service');
  });
});
