const assert = require('assert');
const app = require('@src/app');
const {people, absences, authenticate} = require('@constants/services');
const {authentication} = require('@constants/config');
const routeBuilder = require('@helpers/routebuilder');
const jwtGen = require('@helpers/jwt-gen');

describe('\'people\' service', () => {
  const authService = app.service(routeBuilder(app, authenticate));
  const peopleService = app.service(routeBuilder(app, people));
  const absenceService = app.service(routeBuilder(app, absences));

  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  let personId = null;
  let absenceId = null;

  it('registered the service', () => {

    assert.ok(peopleService, 'Registered the service');
  });

  it('creates the person record', async () => {
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});
    const personResult = await peopleService.create({name: 'Test Person'}, {headers});
    personId = personResult._id;
    let absenceResult = await absenceService.create({name: 'Test absence', person: personId}, {headers});
    absenceId = absenceResult._id;
  });

  it('get the person record with child absence record', async () => {
    const personRecord = await peopleService.get(personId, {headers});
    assert.deepEqual(personRecord, {_id: personId, name: 'Test Person', absences: [
      {_id: absenceId, name: 'Test absence'}
    ]}, 'wrong record retrieved');
  });

  it('removes the person record with child absence record', async () => {
    let result = await peopleService.remove(personId, {headers});
    assert.equal(result._id.toString(), personId.toString());
    result = await absenceService.find({query: {_id: absenceId}, headers});
    assert.equal(result.total, 0);
  });
});
