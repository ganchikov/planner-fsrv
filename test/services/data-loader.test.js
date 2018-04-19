const assert = require('assert');
const app = require('../../src/app');

describe('\'data-loader\' service', () => {
  it('registered the service', () => {
    const service = app.service('loader');

    assert.ok(service, 'Registered the service');
  });
});
