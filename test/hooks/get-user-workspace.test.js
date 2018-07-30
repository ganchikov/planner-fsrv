const assert = require('assert');
const app = require('../../src/app');
const getUserWorkspace = require('../../src/hooks/get-user-workspace');
const jwtGen = require('../../src/helpers/jwt-gen');
const {authentication} = require('../../src/constants/config');
const {workspace, users} = require('../../src/constants/services');
const routeBuilder = require('../../src/helpers/routebuilder');


describe('\'getUserWorkspace\' hook', () => {
  const dummyUsersServiceName = 'dummyUsers';
  const authSettings = app.get(authentication);  
  const jwt = new jwtGen(authSettings);
  const headers = {authorization: 'BEARER ' + jwt.getAccessToken().compact()};
  const workspaceSvc = app.service(routeBuilder(app, workspace));
  const userSvc = app.service(routeBuilder(app, users));
  let userId = null;  
  let workspaceId = null;

  beforeEach(async () => {

    
    let result = await userSvc.find({authId: jwt.getIdToken().sub, headers});
    if (result.data.length>0) {
      userId = result.data[0]._id;
    }

    result = await workspaceSvc.find({user: userId, headers});
    if (result.data.length === 0) {
      result = await workspaceSvc.create({user: userId}, {headers});
      workspaceId = result._id;
    } else {
      workspaceId = result.data[0]._id;
      
    }

    app.use('/' + dummyUsersServiceName, {
      async get(id) {
        return {data: [userId]};
      },
      async find() {
        return {data: [userId]};
      }
    });

    app.service(dummyUsersServiceName).hooks({
      after: {
        get: [getUserWorkspace()],        
        find: [getUserWorkspace()]
      }
    });

  });

  it('runs the hook', async () => {
    const result = await app.service(dummyUsersServiceName).get('test', {headers});
    assert.deepEqual(result, {data: [userId], workspace: workspaceId }, 'correct workspace id is not retrieved in the result');
  });
});