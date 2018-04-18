const assert = require('assert');
const app = require('../../src/app');

describe('\'absences\' service', () => {
  it('registered the service', () => {
    const service = app.service('absences');

    assert.ok(service, 'Registered the service');
  });
});
