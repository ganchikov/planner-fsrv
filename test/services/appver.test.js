const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {appver} = require('../../src/constants/services');

describe('\'appver\' service', () => {
  
  const service = app.service(routeBuilder(app, appver));

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('retrieves the application version & build number', async () => {
    const result = await service.find();
    assert.ok(result.hasOwnProperty('version'), 'version retrieved');
    assert.ok(result.hasOwnProperty('build'), 'build retrieved');
  });
});
