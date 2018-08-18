const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {tasks} = require('@constants/services');

describe('\'tasks\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, tasks));

    assert.ok(service, 'Registered the service');
  });
});
