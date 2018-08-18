const app = require('@src/app');
const assert = require('assert');
const jwtGen = require('@helpers/jwt-gen');
const {authentication} = require('@constants/config');
const {createUserWorkspace} = require('@hooks');
const {workspace, users} = require('@constants/services');
const routeBuilder = require('@helpers/routebuilder');

describe('\'create-workspace\' hook', () => {
  const dummyUsersServiceName = 'dummyUsers';
  const authSettings = app.get(authentication);  
  const jwt = new jwtGen(authSettings);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  const workspaceSvc = app.service(routeBuilder(app, workspace));
  const userSvc = app.service(routeBuilder(app, users));
  let userId = null;  
  let wsId = null;

  beforeEach(async () => {
    app.use('/' + dummyUsersServiceName, {
      async create(data) {
        return data;
      }
    });

    app.service(dummyUsersServiceName).hooks({
      after: {
        create: [createUserWorkspace()]
      }
    });
    
    const result = await userSvc.find({authId: jwt.getIdToken().sub, headers});
    if (result.data.length>0) {
      userId = result.data[0]._id;
    }

  });

  it('runs the hook and creates workspace', async () => {
    const result = await app.service(dummyUsersServiceName).create(userId, {headers});
    assert.ok(result.workspace, 'workspace id not retrieved');
    wsId = result.workspace;
  });

  it('deletes workspace just created', async () => {
    const result = await workspaceSvc.remove(wsId, {headers});
    assert.ok(result, 'deletion ok result is not retrieved');
  });
});
