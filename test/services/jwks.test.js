const assert = require('assert');
const app = require('../../src/app');

describe('\'jwks\' service', () => {
  it('registered the service', () => {
    const service = app.service('jwks');

    assert.ok(service, 'Registered the service');
  });
});
