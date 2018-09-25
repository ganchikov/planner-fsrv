const assert = require('assert');
const app = require('@src/app');
const routeBuilder = require('@helpers/routebuilder');
const {teams, people, absences, authenticate} = require('@constants/services');
const {authentication} = require('@constants/config');
const jwtGen = require('@helpers/jwt-gen');


describe('\'teams\' service', () => {
  const authService = app.service(routeBuilder(app, authenticate));
  const teamService = app.service(routeBuilder(app, teams));
  const peopleService = app.service(routeBuilder(app, people));
  const absenceService = app.service(routeBuilder(app, absences));

  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  let teamRecord = null;
  let teamId = null;
  let personId = null;
  let absenceId = null;

  it('registered the service', async () => {
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});
    const personResult = await peopleService.create({name: 'Test Person'}, {headers});
    personId = personResult._id;
    assert.ok(teamService, 'Service not registered');
    const absenceResult = await absenceService.create({name: 'Test absence', person: personId}, {headers});
    absenceId = absenceResult._id;
  });

  it('creates the team record without persons', async () => {
    const teamObject = {
      name: 'Test team',
      people: []
    };
    teamRecord = await teamService.create(teamObject, {headers});
    assert.ok(teamRecord, 'team not created');
    teamId = teamRecord._id;
  });

  it('updates the team record with person included', async() => {
    teamRecord.members.push(personId);
    teamRecord = await teamService.patch(teamId, teamRecord, {headers});
    assert.equal(teamRecord.members[0].toString(), personId.toString(), 'team record not updated with person');
  });

  it('get the team record with child person records', async () => {
    teamRecord = await teamService.get(teamId, {headers});
    assert.equal(teamRecord.members[0]._id.toString(), personId.toString(), 'wrong person record retrieved for team');
    assert.equal(teamRecord.members[0].name, 'Test Person', 'child person record details not fetched');
    // assert.equal(teamRecord.members[0].absences[0]._id.toString(), absenceId.toString(), 'wrong absence record retrieved for person');
  });

  it('removes the team record without child person record removal', async () => {
    let result = await teamService.remove(teamId, {headers});
    assert.equal(result._id.toString(), teamId.toString(), 'Wrong team id removed!');
    result = await peopleService.find({query: {_id: personId}, headers});
    assert.equal(result.total, 1, 'person for removed team removed!');
  });

});
