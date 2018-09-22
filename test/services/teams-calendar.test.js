const assert = require('assert');
const app = require('../../src/app');
const routeBuilder = require('@helpers/routebuilder');
const {teams_calendar, authenticate} = require('@constants/services');
const {authentication} = require('@constants/config');
const jwtGen = require('@helpers/jwt-gen');


describe('\'teams-calendar\' service', () => {

  const authService = app.service(routeBuilder(app, authenticate));
  const teamCalService = app.service(routeBuilder(app, teams_calendar));

  let authConfig = app.get(authentication);
  const jwt = new jwtGen(authConfig);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};

  it('registered the service', async () => {
    await authService.create({id_token: jwt.getIdToken().compact()}, {headers});
    assert.ok(teamCalService, 'Registered the service');
  });
});
