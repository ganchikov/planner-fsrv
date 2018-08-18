const assert = require('assert');
const createService = require('@src/services/appver/appver.class');

describe('\'appver\' service', () => {

  it('retrieves current application version', async () => {
    const service = createService({});
    const data = await service.find();    
    assert.ok(data.hasOwnProperty('version'), 'version retrieved');
    assert.ok(data.hasOwnProperty('build'), 'build retrieved');

  });
});
