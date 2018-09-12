const assert = require('assert');
const app = require('../../src/app');

describe('\'teams-calendar\' service', () => {
  it('registered the service', () => {
    const service = app.service('teams-calendar');

    assert.ok(service, 'Registered the service');
  });
});
