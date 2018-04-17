const assert = require('assert');
const app = require('../../src/app');

describe('\'idgenerator\' service', () => {
  it('registered the service', () => {
    const service = app.service('idgenerator');

    assert.ok(service, 'Registered the service');
  });
});
