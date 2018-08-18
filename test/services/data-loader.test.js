const assert = require('assert');
const app = require('@src/app');

const {dataloader, authenticate, teams, people, absences} = require('@constants/services');
const {authentication} = require('@constants/config');
const routeBuilder = require('@helpers/routebuilder');
const jwtGen = require('@helpers/jwt-gen');

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
  const authService = app.service(routeBuilder(app, authenticate));
  const tgtService = app.service(routeBuilder(app, dataloader));
  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);

  it('registered the service', () => {
    assert.ok(tgtService, 'Registered the service');
  });

  it('loads the data', async () => {
    const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});

    const teamService = app.service(routeBuilder(app, teams));
    const peopleService = app.service(routeBuilder(app, people));
    const absenceService = app.service(routeBuilder(app, absences));

    const result = await tgtService.create(sampleData, {headers});
    assert.ok(result.length > 0, 'data loaded');
    // assert.ok(result[0].hasOwnProperty('id'), 'result contains team item');
    // assert.ok(result[0].length > 0, 'result team contains members');


    const createdTeam = await teamService.get(result[0]._id,{headers});
    assert.ok(createdTeam, 'created team can be retrieved via teams service');
    const createdPerson = await peopleService.get(createdTeam.members[0],{headers});
    assert.ok(createdPerson, 'created team can be retrieved via members service');
    const createdAbsence = await absenceService.get(createdPerson.absences[0],{headers});
    assert.ok(createdAbsence, 'created absence can be retrieved via absences service');

  });
});
