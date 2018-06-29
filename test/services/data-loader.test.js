const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('../../src/helpers/routebuilder');
const {dataloader} = require('../../src/constants/services');
const {teams, people, absences} = require('../../src/constants/services');
const {MockJwt} = require('../../src/hooks');

const sampleData = [{
  name: 'Alpha',
  members : [
      {
          name: 'John',
          start_date: '2018-01-01',
          absences: [
              {
                  start_date: '2018-01-01',
                  end_date: '2018-01-31',
                  name: 'vacation',
                  confirmed: 'true'
              }                            
          ]
      }
  ]
}];

describe('\'data-loader\' service', function() {
  this.timeout(15000);
  
  const service = app.service(routeBuilder(app, dataloader));

  service.hooks({
    before: [MockJwt()]
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('loads the data', async () => {

    const teamService = app.service(routeBuilder(app, teams));
    const peopleService = app.service(routeBuilder(app, people));
    const absenceService = app.service(routeBuilder(app, absences));

    const result = await service.create(sampleData);
    assert.ok(result.length > 0, 'data loaded');
    // assert.ok(result[0].hasOwnProperty('id'), 'result contains team item');
    // assert.ok(result[0].length > 0, 'result team contains members');


    const createdTeam = await teamService.get(result[0]._id);
    assert.ok(createdTeam, 'created team can be retrieved via teams service');
    const createdPerson = await peopleService.get(createdTeam.members[0]);
    assert.ok(createdPerson, 'created team can be retrieved via members service');
    const createdAbsence = await absenceService.get(createdPerson.absences[0]);
    assert.ok(createdAbsence, 'created absence can be retrieved via absences service');

  });
});
