const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {people} = require('../../src/constants/services');

describe('\'people\' service', () => {
  it('registered the service', () => {
    const service = app.service(routeBuilder(app, people));

    assert.ok(service, 'Registered the service');
  });
});
